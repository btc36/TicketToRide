import { ClientCommandObjects } from "./clientCommandObjects";
import { Serializer } from "./Serializer";

export class ClientCommunicator {
    serverUrl: string;
    serverPort: string;
    serializer: Serializer;
    constructor(public serverUrlIn: string, public serverPortIn: string) {
        this.serverUrl = serverUrlIn;
        this.serverPort = serverPortIn;
        this.serializer = new Serializer();
    }
    public sendCommand(command: ClientCommandObjects){
        var data = this.serializer.toJSON(command);
        var request = new XMLHttpRequest();
        request.open('POST', this.serverUrl, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            var currentSerializer = new Serializer();
            if (request.status >= 200 && request.status < 400) {
              // Success!
              var result = currentSerializer.parseJSON(request.responseText);
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

    }
}
