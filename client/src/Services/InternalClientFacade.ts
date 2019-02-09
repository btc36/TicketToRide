import { ServerProxy } from "../serverProxy";

export default class InternalClientFacade {
    proxy: ServerProxy;

    constructor(proxy:ServerProxy) {
        this.proxy = proxy;
    }

    login(username: string, password: string) {
        this.proxy.login(username, password);
    }

    register(username: string, password: string) {
        this.proxy.register(username, password, "YES");
    }

    createGame(numPlayers: number, gameName: string) {
        this.proxy.createGame(me, numPlayers, gameName);
    }

    getGameList(){
        this.proxy.getGameList();
    }

    joinGame(gameId: number) {
        this.proxy.joinGame(player, gameId);
   }

    startGame(gameId:string){
    	this.proxy.startGame(gameId);
    }

}
