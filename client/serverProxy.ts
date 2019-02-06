import { ClientCommandObjects } from "./clientCommandObjects";
import { ClientCommunicator } from "./clientCommunicator";
//import { Serializer } from "./serializer";

export class ServerProxy {
    host: string;
    port: string;
    constructor(public hostIn: string, public portIn: string) {
        this.host = hostIn;
        this.port = portIn;
    }
    public register(username:string, password:string, confirm:string){
        let url = new URL("http://" + this.host + ":" + this.port + "/register");
        let command = new ClientCommandObjects("ServerFacade", "register", ["string", "string"], [username, password]);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public login(username: string, password: string){
        let url = new URL("http://" + this.host + ":" + this.port + "/login");
        let command = new ClientCommandObjects("ServerFacade", "login", ["string", "string"], [username, password]);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public createGame(username: string, numPlayers: number, gameName: string){
        let url = new URL("http://" + this.host + ":" + this.port + "/creategame");
        let command = new ClientCommandObjects("ServerFacade", "createGame", ["string", "string", "number"], [username, gameName, numPlayers]);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public joinGame(username: string, gameName: string, gameId: string){
        let url = new URL("http://" + this.host + ":" + this.port + "/joingame");
        let command = new ClientCommandObjects("ServerFacade", "joinGame", ["string", "string", "string"], [username, gameName, gameId]);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public startGame(gameId: string){
        let url = new URL("http://" + this.host + ":" + this.port + "/startgame");
        let command = new ClientCommandObjects("ServerFacade", "startGame", ["string"], [gameId]);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
    public getGameList(){
        let url = new URL("http://" + this.host + ":" + this.port + "/getgamelist");
        let command = new ClientCommandObjects("ServerFacade", "getGameList", [], []);
        let communicator = new ClientCommunicator(url, this.port);
        communicator.sendCommand(command);
    }
}