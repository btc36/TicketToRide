
class InternalClientFacade {
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

    createGame(me: Player, numPlayers: number, gameName: string) {
        this.proxy.createGame(me, numPlayers, gameName);
    }

    getGameList(){
        this.proxy.getGameList();
    }

    joinGame(player:Player,gameId: number) {
        this.proxy.joinGame(player, gameId);
   }

}
