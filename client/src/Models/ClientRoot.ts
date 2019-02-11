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
    //What is this constructor, and all the other classes. Does the client start out empty?
    constructor() {
        this.gameList = new GameList();
        this.myPlayer = null;
        this.lobby = null;
        this.session = new Session();
        this.observers = new Array<IObserver>();
    }
    //add an observer 
    attach(o: IObserver) {
        this.observers.push(o); 
    }
    //remove an observer
    detach(o: IObserver) {

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

    joinGame(gameId: string) {
        this.myPlayer.setCurrentGame(gameId)
        this.transitionPage("lobbyGame");
    }
 
    getCurrentUser(){
    	return this.myPlayer.getUsername();
    }

    updateGameList(gameList: Array<LobbyGame>) {
        this.gameList.replaceGameList(gameList);
        this.notify("updateGameList", this.gameList);
    }

    startGame(gameId:string){
    	this.notify("startGame",gameId);
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
