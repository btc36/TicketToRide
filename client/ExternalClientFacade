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

    transitionPage(pageName: string) {
        this.root.transitionPage(pageName);
    }

    getGameList(): Array<LobbyGame> {
        let gameList = this.root.getGameList();
        return gameList;
    }

    joinGame(gameId: number) {
        this.root.joinGame(gameId);
    }

}
