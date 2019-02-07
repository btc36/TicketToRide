class ServerProxy {
    host: string;
    port: string;
    constructor(public hostIn: string, public portIn: string) {
        this.host = hostIn;
        this.port = portIn;
    }
    public register(username: string, password: string, confirm: string) {
        let url = new URL("http://" + this.host + ":" + this.port + "/user/register");
    }
    public login(username: string, password: string) {

    }
    public createGame(player: Player, numPlayers: number, gameName: string) {

    }
    public joinGame(player: Player, gameId: number) {

    }
    public startGame(player: Player, gameId: number) {

    }
    public getGameList() {

    }
}


class InternalClientFacade {
    root: ClientRoot;
    proxy: ServerProxy;


    constructor(root:ClientRoot,proxy:ServerProxy) {
        this.root = root;
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
    //Move to external Facade?
    getGameList(){
        this.proxy.getGameList();
    }
    //Move to external Facade?
    joinGame(player:Player,gameId: number) {
        this.proxy.joinGame(player, gameId);
   }

}

class ExternalClientFacade {
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

    updateGameList(games: Array<LobbyGame>) {
        this.root.updateGameList(games);
    }

    //Move to external Facade?
    transitionPage(pageName: string) {
        this.root.transitionPage(pageName);
    }

    //Move to external Facade?
    getGameList(): Array<LobbyGame> {
        let gameList = this.root.getGameList();
        return gameList;
    }
    //Move to external Facade?
    joinGame(gameId: number) {
        this.root.joinGame(gameId);
    }

}
