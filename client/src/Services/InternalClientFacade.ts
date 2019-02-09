import { ServerProxy } from "../serverProxy";

export default class InternalClientFacade {
    proxy: ServerProxy;
    root: RootModel;

    constructor(proxy:ServerProxy,root:RootModel) {
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
    	me = this.root.getCurrentUser();
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
