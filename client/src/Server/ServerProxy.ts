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
        var command = new ClientCommandObjects("ServerFacade", "register", ["_paramTypeString", "_paramTypeString"], [username, password]);
        this.communicator.sendCommand(command);
    }
    public login(username: string, password: string){
        var command = new ClientCommandObjects("ServerFacade", "login", ["_paramTypeString", "_paramTypeString"], [username, password]);
        this.communicator.sendCommand(command);
    }
    public createGame(username: string, numPlayers: number, gameName: string){
        var command = new ClientCommandObjects("ServerFacade", "createGame", ["_paramTypeString", "_paramTypeString", "_paramTypeInteger"], [username, gameName, numPlayers]);
        this.communicator.sendCommand(command);
    }
    public joinGame(username: string, gameName: string, gameId: string){
        var command = new ClientCommandObjects("ServerFacade", "joinGame", ["_paramTypeString", "_paramTypeString", "_paramTypeString"], [username, gameName, gameId]);
        this.communicator.sendCommand(command);
    }
    public startGame(gameId: string){
        var command = new ClientCommandObjects("ServerFacade", "startGame", ["_paramTypeString"], [gameId]);
        this.communicator.sendCommand(command);
    }
    public getGameList(){
        var command = new ClientCommandObjects("ServerFacade", "getGameList", [], []);
        this.communicator.sendCommand(command);
    }
}
