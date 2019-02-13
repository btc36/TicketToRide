import { LobbyGame } from "./LobbyGame"

export class GameList {
  games: Array<LobbyGame>;

  [key: string]: any;

  constructor() {
    this.games = new Array<LobbyGame>();
  }

  addGame(game: LobbyGame): void {
    this.games.push(game);
  }

  removeGame(gameId: string): void {
    for (var i = this.games.length - 1; i >= 0; --i) {
      if (this.games[i].getGameID() == gameId) {
        this.games.splice(i, 1);
      }
    }
  }

  findGameById(gameId: string): LobbyGame {
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].getGameID() == gameId) {
        return this.games[i];
      }
    }
  }

  replaceGameList(newGameList: Array<LobbyGame>): void {
    this.games = newGameList;
  }

  getGames(): Array<LobbyGame> {
    return this.games;
  }

}
