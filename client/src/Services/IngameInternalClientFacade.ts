import { IngameServerProxy } from "../Server/IngameServerProxy";
import { IngameClientRoot } from "../Models/IngameClientRoot";
import { FaceUpCards } from "../Models/FaceUpCards";
import { DestinationCard } from "../Models/DestinationCard";

export class IngameInternalClientFacade {
  proxy: IngameServerProxy;
  root: IngameClientRoot;

  constructor(_proxy: IngameServerProxy, _root: IngameClientRoot) {
    this.proxy = _proxy;
    this.root = _root;
  }

  PresentDestinationCard() {

  }

  NotifyStartGame() {

  }

  SendChatCommand(message: String, time: Date,username:String, gameId: String) {
    this.proxy.SendChat(message, time, username, gameId);
  }

  DiscardDestinationCard(destinationCards: Array<DestinationCard>) {
    let gameId = this.root.getGameId();
    let username = this.root.getUsername();
    this.proxy.DiscardDestinationCard(gameId, username, destinationCards);
  }

  storeDestinationCard(destinationCards: Array<DestinationCard>) {
    let username = this.root.getUsername();
    this.root.addDestinationCard(username, destinationCard);
  }



  getFaceUpCards(): FaceUpCards {
    return this.root.getFaceUpCards();
  }

  getDestinationCards(): Array<DestinationCard> {
    return this.root.getPresentedDestinationCards();
  }
}
