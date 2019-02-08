class ClientRoot implements Subject {
    gameList: GameList;
    myPlayer: Player;
    lobby: LobbyGame;
    session: Session;
    observers: Array<Observer>;
    //What is this constructor, and all the other classes. Does the client start out empty?
    constructor() {
        this.gameList = new GameList();
        this.myPlayer = null;
        this.lobby = null;
        this.session = new Session();
    }
    //add an observer 
    attach(o: Observer) {
        this.observers.push(o); 
    }
    //remove an observer
    detach(o: Observer) {

    }

    notify(updateType: string, data: any) {
        for (var o of this.observers) {
            o.update(updateType, data);
        }
    }
    transitionPage(pageName: string) {
        this.session.setCurrentPage(pageName);
        this.notify("transitionPage", pageName);
    }


    getGameList(): Array<LobbyGame> {
        let games = this.gameList.getGames();
        return games;
    }

    joinGame(gameId: number) {
        this.myPlayer.setCurrentGame(gameId)
        this.transitionPage("lobbyGame");
    }

    updateGameList(gameList: Array<LobbyGame>) {
        this.gameList.replaceGameList(gameList);
        this.notify("updateGameList", "Something Cool");
    }
    /*
     * loginRegister
     * gameList
     * gameLobby
     */
    loginResults(wasSuccessful: boolean, errorMessage: string) {
        if (wasSuccessful) {
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        } else {
            this.notify("error", errorMessage);
        }
    }

    registerResults(wasSuccessful: boolean, errorMessage: string) {
        if (wasSuccessful) {
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        } else {
            this.notify("error", errorMessage);
        }
    }


}
