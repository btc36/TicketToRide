import { ServerProxy } from "../Server/ServerProxy";
import { ClientRoot } from "../Models/ClientRoot";

// calls proxy
export class InternalClientFacade {
    [x: string]: any;
  proxy: ServerProxy;
  root: ClientRoot;

  constructor(proxy:ServerProxy,root:ClientRoot) {
    this.proxy = proxy;
    this.root = root;
  }

  login(username: string, password: string) {
    this.proxy.login(username, password);
  }

  register(username: string, password: string) {
    this.proxy.register(username, password, "YES");
  }

  createGame(numPlayers: number, gameName: string) {
    const me = this.root.getCurrentUser();
    this.proxy.createGame(me, numPlayers, gameName);
  }

  getGameList(){
    this.proxy.getGameList();
  }

  getPlayerList(gameId: string) {
    return this.root.getPlayerList(gameId);
  }

  getCurrentGameId(): string {
    return this.root.getGameIdForUsername(this.root.getCurrentUser());
  }

  joinGame(gameName: string, gameId: string) {
    const me = this.root.getCurrentUser();
    this.proxy.joinGame(me, gameName, gameId);
  }

  startGame(gameId:string){
    this.proxy.startGame(gameId);
  }

}
