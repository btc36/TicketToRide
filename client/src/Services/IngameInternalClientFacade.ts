import { IngameServerProxy } from "../Server/IngameServerProxy";
import { IngameClientRoot } from "../Models/IngameClientRoot";
import { FaceUpCards } from "../Models/FaceUpCards";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { PlayerHand } from "../Models/PlayerHand";
import {TrainCard} from "../Models/TrainCard";
import {Game} from "../Models/Game";

// calls proxy
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

  claimRoute(route: Route) {
    if(this.root.preferredColor == null && route.color == "grey") {
      alert("Please select which train cards you would like to spend.");
    }
    else {
      if(route.color != "grey") {
        this.root.preferredColor = route.color;
      }
      let gameID = this.root.getGameID();
      let username = this.root.getUsername();
      let prefColor = this.root.preferredColor;
      this.SendChatCommand("Claimed the route from " + route.getCities()[0] + " to " + route.getCities()[1]);
      this.proxy.claimRoute(route, username, gameID, prefColor);
    }
  }

  isMyTurn(): boolean {
    return this.root.isMyTurn();
  }

  PresentDestinationCard() {

  }

  NotifyStartGame() {

  }

  setPreferredColor(color: string) {
    this.root.preferredColor = color;
  }

  getChatHistory(){
    this.proxy.getChatHistory(this.root.game.gameID);
  }

  endTurn() {
    this.proxy.endTurn(this.root.getGameID(), this.root.getLocalPlayer());
  }

  whoseTurn() {
    this.proxy.whoseTurn(this.root.getGameID());
  }

  SendChatCommand(message: String, time?: string) {
    if (!time) {
      let today = new Date();
      time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    }
    let username = this.root.getUsername();
    let gameID = this.root.getGameID();
    this.proxy.SendChat(message, time, username, gameID);
  }

  DiscardDestinationCard(destinationCards: Array<DestinationCard>) {
    let gameID = this.root.getGameID();
    let username = this.root.getUsername();

    this.proxy.DiscardDestinationCard(gameID, username, destinationCards);
    console.log("Destination cardcccc");
    this.root.discardDestinationCard();
    this.SendChatCommand("Discarded destination card(s): " + destinationCards.join(", "));
  }

  storeDestinationCard(destinationCards: Array<DestinationCard>) {
    console.log("DUMB BU+G");
    console.log(destinationCards);
    let username = this.root.getUsername();
    this.root.addDestinationCard(username, destinationCards);
    this.SendChatCommand("Stored destination card(s): " + destinationCards.join(", "));
  }

  drawTrainCard(index: number) {
    console.log("CALLING MY PROXY");
    this.proxy.drawTrainCard(this.root.getGameID(), this.root.getLocalPlayer(), index);//Zero based index
    //This needs to ask the server, not dummy test code;
    //let drawnCard = this.root.changeFaceUpCards();
    let humanNum = index += 1;
    this.SendChatCommand("Drew Face Up Card: " + humanNum);
  }

  printRoot() {
    console.log(this.root);
  }
  getFaceUpCards(): FaceUpCards {
    console.log(this.root);
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

  getGame(): Game{
    return this.root.getGame();
  }

  getUsername(): String{
    return this.root.getUsername();
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
