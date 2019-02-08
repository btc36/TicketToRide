import { ClientCommandObjects } from "./ClientCommandObjects";
import { ClientCommunicator } from "./ClientCommunicator";
//import { Serializer } from "./serializer";

export class ServerProxy {
    host: string;
    port: string;
    constructor(public hostIn: string, public portIn: string) {
        this.host = hostIn;
        this.port = portIn;
    }
    public register(username:string, password:string, confirm:string){
        var url = "http://" + this.host + ":" + this.port + "/register";
        var command = new ClientCommandObjects("ServerFacade", "register", ["string", "string"], [username, password]);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public login(username: string, password: string){
        var url = "http://" + this.host + ":" + this.port + "/login";
        var command = new ClientCommandObjects("ServerFacade", "login", ["string", "string"], [username, password]);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public createGame(username: string, numPlayers: number, gameName: string){
        var url = "http://" + this.host + ":" + this.port + "/creategame";
        var command = new ClientCommandObjects("ServerFacade", "createGame", ["string", "string", "number"], [username, gameName, numPlayers]);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public joinGame(username: string, gameName: string, gameId: string){
        var url = "http://" + this.host + ":" + this.port + "/joingame";
        var command = new ClientCommandObjects("ServerFacade", "joinGame", ["string", "string", "string"], [username, gameName, gameId]);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public startGame(gameId: string){
        var url = "http://" + this.host + ":" + this.port + "/startgame";
        var command = new ClientCommandObjects("ServerFacade", "startGame", ["string"], [gameId]);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public getGameList(){
        var url = "http://" + this.host + ":" + this.port + "/getgamelist";
        var command = new ClientCommandObjects("ServerFacade", "getGameList", [], []);
        var communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
}