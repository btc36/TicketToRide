import { ClientCommandObjects } from "./ClientCommandObjects";
import { Serializer } from "./Serializer";
import { ExternalClientFacade } from "../Services/ExternalClientFacade";

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
        request.open('POST', this.serverPort + this.serverUrl, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let that = this;
        let serial = this.serializer;
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
              // Success!
              var result = serial.parseJSON(request.responseText);
              that.executeCommands([result]);
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
        if (commands[i].methodName == "loginStatus"){
          this.clientFacade.loginResults(commands[i].paramValues[0], commands[i].paramValues[1]);
        }
        else if (commands[i].methodName == "registerStatus"){
          this.clientFacade.registerResults(commands[i].paramValues[0], commands[i].paramValues[1]);
        }
        else if (commands[i].methodName == "createGame"){
          this.clientFacade.updateGameList(this.serializer.parseJSONGames(commands[i].paramValues[2]);
        }
        else if (commands[i].methodName == "joinGame"){
          this.clientFacade.joinGame(commands[i].paramValues[2]);
        }
        else if (commands[i].methodName == "startGame"){
          this.clientFacade.startGame(commands[i].paramValues[2]);
        }
      }
    }
}
