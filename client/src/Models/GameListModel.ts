import {LobbyGame} from "./LobbyGameModel"
export class GameList {
    games: Array<LobbyGame>;

    constructor() {
        this.games = new Array<LobbyGame>();
    }

    addGame(game: LobbyGame) {
        this.games.push(game);
    }

    removeGame(gameId: number) {
        for (var i = this.games.length - 1; i >= 0; --i) {
            if (this.games[i].getGameID == gameId) {
                this.games.splice(i, 1);
            }
        }
    }

    replaceGameList(newGameList: Array<LobbyGame>) {
        this.games = newGameList;
    }

    getGames(): Array<LobbyGame> {
        return this.games;
    }

}
