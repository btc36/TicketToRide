import { ClientCommandObjects } from "./ClientCommandObjects";
import { ClientCommunicator } from "./ClientCommunicator";
//import { Serializer } from "./serializer";

export class ServerProxy {
    host: string;
    port: string;
    communicator: ClientCommunicator;
    constructor(public commIn: ClientCommunicator) {
        this.communicator = commIn;
    }
    public register(username:string, password:string, confirm:string){
        const command = new ClientCommandObjects("server.ServerFacade", "register", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    }
    public login(username: string, password: string){
        const command = new ClientCommandObjects("server.ServerFacade", "login", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    }
    public createGame(username: string, numPlayers: number, gameName: string){
        const command = new ClientCommandObjects("server.ServerFacade", "createGame", ["java.lang.String", "java.lang.String", "java.lang.String"], [username, gameName, String(numPlayers)]);
        this.communicator.sendCommand(command);
    }
    public joinGame(username: string, gameName: string, gameId: string){
        const command = new ClientCommandObjects("server.ServerFacade", "joinGame", ["java.lang.String", "java.lang.String"], [username, gameId]);
        this.communicator.sendCommand(command);
    }
    public startGame(gameId: string){
        const command = new ClientCommandObjects("server.ServerFacade", "startGame", ["java.lang.String"], [gameId]);
        this.communicator.sendCommand(command);
    }
    public getGameList(){
        const command = new ClientCommandObjects("server.ServerFacade", "getGameList", [], []);
        this.communicator.sendCommand(command);
    }
}
