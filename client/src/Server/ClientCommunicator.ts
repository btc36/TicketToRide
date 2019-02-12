import { ClientCommandObjects } from "./ClientCommandObjects";
import { Serializer } from "./Serializer";
import { ExternalClientFacade } from "../Services/ExternalClientFacade";
import { GameList } from "../Models/GameList";
import { Player } from "../Models/Player";
import { LobbyGame } from "../Models/LobbyGame";

export class ClientCommunicator {
    serverUrl: string;
    serverPort: string;
    serializer: Serializer;
    clientFacade: ExternalClientFacade;

    constructor(public serverUrlIn: string, public serverPortIn: string, public serialIn: Serializer, public facadeIn: ExternalClientFacade) {
        this.serverUrl = serverUrlIn;
        this.serverPort = serverPortIn;
        this.serializer = serialIn;
        this.clientFacade = facadeIn;
    }
    public sendCommand(command: ClientCommandObjects){
        var data = this.serializer.toJSON(command);
        var request = new XMLHttpRequest();
        request.open('POST', "/command", true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let that = this;
        let serial = this.serializer;
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
              // Success!
              var result = serial.parseJSON(request.responseText);
              that.executeCommands(result);
            } else {
              // We reached our target server, but it returned an error
          
            }
          };
          
          request.onerror = function() {
            // There was a connection error of some sort
          };
        request.send(data);
    }

    public executeCommands(commands: ClientCommandObjects[]){
      for (var i = 0; i < commands.length; i++){
        if (commands[i]._methodName == "loginStatus"){
          this.clientFacade.loginResults(commands[i]._paramValues[0], commands[i]._paramValues[1]);
        }
        else if (commands[i]._methodName == "registerStatus"){
          this.clientFacade.registerResults(commands[i]._paramValues[0], commands[i]._paramValues[1]);
        }
        else if (commands[i]._methodName == "updateGameList"){
          const games = commands[i]._paramValues[2];
          const gameList = new GameList();
          for (let i = 0; i < games.length; i++) {
            const gameID = games[i].gameID;
            const name = games[i].gamename;
            const host = new Player(games[i].host);
            const maxPlayers = games[i].maxPlayers;
            const game = new LobbyGame(gameID, host, name, maxPlayers);

            const players = games[i].playerList.playerList;
            for (let j = 0; j < players.length; j++) {
              const player = new Player(players[j].username);
              game.addPlayer(player);
            }
            gameList.addGame(game);
          }
          this.clientFacade.updateGameList(commands[i]._paramValues[0], gameList, commands[i]._paramValues[1]);
        }
        else if (commands[i]._methodName == "joinGame"){
          this.clientFacade.joinGame(commands[i]._paramValues[2]);
        }
        else if (commands[i]._methodName == "startGame"){
          this.clientFacade.startGame(commands[i]._paramValues[2]);
        }
      }
    }
}
