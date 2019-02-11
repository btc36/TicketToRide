import { ClientCommandObjects } from "./ClientCommandObjects";
import { GameList } from "../Models/GameList";

export class Serializer {
    constructor() {
    }
    public toJSON(command: ClientCommandObjects){
        var myCommand = JSON.stringify(command);
        return myCommand;
    }
    public parseJSON(command: string){
        var myCommand: ClientCommandObjects = JSON.parse(command);
        return myCommand;
    }
    public parseJSONGames(games: string){
        var gameList: GameList = JSON.parse(games);
        return gameList;
    }
}