import { IngameServerProxy } from "../Server/IngameServerProxy";
import { IngameClientRoot } from "../Models/IngameClientRoot";
import { FaceUpCards } from "../Models/FaceUpCards";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { PlayerHand } from "../Models/PlayerHand";

export class IngameInternalClientFacade {
  proxy: IngameServerProxy;
  root: IngameClientRoot;

  constructor(_proxy: IngameServerProxy, _root: IngameClientRoot) {
    this.proxy = _proxy;
    this.root = _root;
  }

  randomize() {
    this.root.randomize();
  }

  PresentDestinationCard() {

  }

  NotifyStartGame() {

  }

  getChatHistory(){
    this.proxy.getChatHistory(this.root.game.gameID);
  }

  SendChatCommand(message: String, time: string) {
    let username = this.root.session.loggedInUser.username;
    let gameId = this.root.game.gameID;

    this.proxy.SendChat(message, time, username, gameId);
  }

  DiscardDestinationCard(destinationCards: Array<DestinationCard>) {
    let gameId = this.root.getGameId();
    let username = this.root.getUsername();
    this.proxy.DiscardDestinationCard(gameId, username, destinationCards);
    this.root.discardDestinationCard();
  }

  storeDestinationCard(destinationCards: Array<DestinationCard>) {
    let username = this.root.getUsername();
      this.root.addDestinationCard(username, destinationCards);
  }

  printRoot() {
    console.log(this.root);
  }
  getFaceUpCards(): FaceUpCards {
    return this.root.getFaceUpCards();
  }

  getDestinationCards(): Array<DestinationCard> {
    return this.root.getPresentedDestinationCards();
  }

  getNumDestinationCardsRemaining(): number {
    return this.root.getNumDestinationCardsRemaining();
  }

  getNumTrainCardsRemaining(): number {
    return this.root.getNumTrainCardsRemaining();
  }

  getPlayerHand(): PlayerHand{
    return this.root.getPlayerHand();
  } 

  getAllOwnedRoutes(): Array<Route> {
    let routes = new Array<Route>();
    let players = this.root.getPlayerList();
    for (let i = 0; i < players.length; i++) {
      let r = players[i].getOwnedRoutes();
      if (r) {
        for (let j = 0; j < r.length; j++) {
          routes.push(r[j]);
        }
      }
    }
    return routes;
  }
}
