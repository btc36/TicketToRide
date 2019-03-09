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

  getChatHistory(){
    this.proxy.getChatHistory(this.root.game.gameID);
  }

  SendChatCommand(message: String, time: string) {
    let username = this.root.session.loggedInUser.username;
    let gameId = this.root.game.gameID;

    this.proxy.SendChat(message, time, username, gameId);
  }

  DiscardDestinationCard() {

  }

  getFaceUpCards(): FaceUpCards {
    return this.root.getFaceUpCards();
  }

  getDestinationCards(): Array<DestinationCard> {
    return this.root.getPresentedDestinationCards();
  }
}
