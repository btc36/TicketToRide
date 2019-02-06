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


    constructor() {
        this.root = new ClientRoot();
        this.proxy = new ServerProxy("hostIn","portIn");
    }

    login(username: string, password: string) {
        this.proxy.login(username, password);
    }

    register(username: string, password: string) {
        this.proxy.register(username, password, "YES");
    }

    transitionPage(pageName: string) {
        this.root.transitionPage(pageName);
    }

    createGame(me: Player, numPlayers: number, gameName: string) {
        this.root.createGame(me, numPlayers, gameName);
    }

    getGameList():Array<LobbyGame> {
        let gameList = this.root.getGameList();
        return gameList; 
    }

    joinGame(gameId: number) {
        this.root.joinGame(gameId);
    }

}

class ExternalClientFacade {
    loginResults(wasSuccessful: boolean, errorMessage: string) {

    }

    registerResults(wasSuccessful: boolean, errorMessage: string) {

    }

    updateGameList(games: Array<LobbyGame>) {
        
    }
}
