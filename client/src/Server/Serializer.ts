import { ClientCommandObjects } from "./ClientCommandObjects";
import { GameList } from "../Models/GameList";

export class Serializer {
    constructor() {
    }
    public toJSON(command: ClientCommandObjects){
        const myCommand = JSON.stringify([command]);
        return myCommand;
    }
    public parseJSON(command: string){
        const myCommand: ClientCommandObjects[] = JSON.parse(command);
        return myCommand;
    }
    public parseJSONGames(games: string){
        const gameList: GameList = JSON.parse(games);
        return gameList;
    }
}
