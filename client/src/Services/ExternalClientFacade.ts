import { ClientRoot } from "../Models/ClientRoot";
import { LobbyGame } from "../Models/LobbyGame";
import { GameList } from "../Models/GameList";

// operations on the model
export class ExternalClientFacade {
  root: ClientRoot;

  constructor(root: ClientRoot) {
    this.root = root;
  }
  loginResults(wasSuccessful: boolean, errorMessage: string) {
    this.root.loginResults(wasSuccessful, errorMessage);
  }

  registerResults(wasSuccessful: boolean, errorMessage: string) {
    this.root.registerResults(wasSuccessful, errorMessage);
  }

  updateGameList(wasSuccessful: boolean, games: GameList, errorMessage: string) {
    this.root.updateGameList(wasSuccessful, games, errorMessage);
  }

  transitionPage(pageName: string) {
    this.root.transitionPage(pageName);
  }

  getGameList(): Array<LobbyGame> {
    let gameList = this.root.getGameList();
    return gameList;
  }

  joinGame(gameId: string) {
    console.log("joinGame in externalClientFacade called");
    this.root.joinGame(gameId);
  }

  startGame(gameId:string){
    this.root.startGame(gameId);
  }


}
