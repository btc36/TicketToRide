import { ClientCommandObjects } from "./ClientCommandObjects";
import { Serializer } from "./Serializer";
import { ExternalClientFacade } from "../Services/ExternalClientFacade";
import { GameList } from "../Models/GameList";
import { Player } from "../Models/Player";
import { LobbyGame } from "../Models/LobbyGame";
import { IngameExternalClientFacade } from "../Services/IngameExternalClientFacade";

export class ClientCommunicator {
  serverUrl: string;
  serverPort: string;
  serializer: Serializer;
  clientFacade: ExternalClientFacade;
  inGameClientFacade: IngameExternalClientFacade;

  constructor(public serverUrlIn: string, public serverPortIn: string, public serialIn: Serializer, public facadeIn: ExternalClientFacade, public inGameECFIn: IngameExternalClientFacade) {
    this.serverUrl = serverUrlIn;
    this.serverPort = serverPortIn;
    this.serializer = serialIn;
    this.clientFacade = facadeIn;
    this.inGameClientFacade = inGameECFIn;
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

  // Execute the command received from the server
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
          const maxPlayers = games[i].maxPlayer;
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
        const game = commands[i]._paramValues[3][0];
        const players = game.playerList.playerList; // JSON


        let gamePlayers = new Array<Player>();

        // Players from lobby are in game: 6 percent
        for(let i = 0; i < players.length; i++)
        {
          const player = new Player(players[i].username);
          gamePlayers.push(player);
        }
        this.inGameClientFacade.setPlayerList(gamePlayers);

        // Face-up Deck is initialized by random cards from the server: 7 percent
        //first "faceUpCards" is name of the object and the second "faceUpCards" is name of List in that object
        this.inGameClientFacade.setFaceUpCards(game.faceUpCards.faceUpCards); // 5 face up cards

        // Each player has 4 random (top of a shuffled deck) train cards from server: 7 percent
        for(let i = 0; i < players.length; i++) // pass out 4 cards to everyone in the client (already done in the server)
        {
          this.inGameClientFacade.storeTrainCards(players[i].username, players[i].trainCards)
        }
      }
      else if (commands[i]._methodName == "receiveChatCommand"){
        this.inGameClientFacade.receiveChatCommand(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[2], commands[i]._paramValues[3]);
      }
      else if (commands[i]._methodName == "potentialDestinationCard"){
        this.inGameClientFacade.presentDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[4]);
      }
      else if (commands[i]._methodName == "discardDestinationCard"){
        this.inGameClientFacade.discardDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[4]);
      }
      else if (commands[i]._methodName == "drawDestinationCard"){
        this.inGameClientFacade.addDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[3], commands[i]._paramValues[4]);
      }
    }
  }
}
