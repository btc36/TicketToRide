import { ClientCommandObjects } from "./clientCommandObjects";
//import { Serializer } from "./serializer";

export class ClientCommunicator {
    serverUrl: URL;
    serverPort: string;
    constructor(public serverUrlIn: URL, public serverPortIn: string) {
        this.serverUrl = serverUrlIn;
        this.serverPort = serverPortIn;
    }
    public sendCommand(command: ClientCommandObjects){

    }
    public executeCommands(commands: ClientCommandObjects[]){

    }
}
