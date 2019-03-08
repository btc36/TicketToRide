import { GameList } from "./GameList"
import { Player } from "./Player"
import { LobbyGame } from "./LobbyGame"
import { Session } from "./Session"
import { IObserver } from "../ViewModels/IObserver"
import { ISubject } from "./ISubject"


export class ClientRoot implements ISubject {
    gameList: GameList;
    myPlayer: Player;
    lobby: LobbyGame;
    session: Session;
    observers: Array<IObserver>;

    constructor() {
        this.gameList = new GameList();
        this.myPlayer = null;
        this.lobby = null;
        this.session = new Session();
        this.observers = new Array<IObserver>();
    }

    public attach(o: IObserver) {
        this.observers.push(o);
    }

    public detach(o: IObserver) {

    }

    notify(updateType: string, data: any) {
        for (const o of this.observers) {
            if (o != null) {
                o.update(updateType, data);
            }
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

    getGameIdForUsername(username: string) {
        let games = this.gameList.getGames();
        for (let i = 0; i < games.length; i++) {
            for (let j = 0; j < games[i].playerList.length; j++) {
                if (games[i].playerList[j].username == username) {
                    return games[i].gameID;
                }
            }
        }
    }

    getPlayerList(gameId: string) {
        let game = this.gameList.findGameById(gameId);
        return game.getPlayerList();
    }

    joinGame(gameId: string) {
        let game = this.gameList.findGameById(gameId);
        game.addPlayer(this.myPlayer);
        this.transitionPage("lobbyGame");
    }

    getCurrentUser() {
        return this.myPlayer.getUsername();
    }

    updateGameList(wasSuccessful: boolean, gameList: GameList, errorMessage: string) {
        if (wasSuccessful) {
            this.gameList.replaceGameList(gameList.getGames());
            this.notify("updateGameList", this.gameList);
        } else {
            this.notify("error", errorMessage);
        }
    }

    startGame(gameId: string) {
        this.notify("startGame", gameId);
    }

    loginResults(wasSuccessful: boolean, data: string) {
        if (wasSuccessful) {
            this.myPlayer = new Player(data);
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        } else {
            this.notify("error", data);
        }
    }

    registerResults(wasSuccessful: boolean, data: string) {
        if (wasSuccessful) {
            this.myPlayer = new Player(data);
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        } else {
            this.notify("error", data);
        }
    }


}
