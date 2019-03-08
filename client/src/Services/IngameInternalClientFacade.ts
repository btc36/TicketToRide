import { IngameServerProxy } from "../Server/IngameServerProxy";
import { IngameClientRoot } from "../Models/IngameClientRoot";
import { FaceUpCards } from "../Models/FaceUpCards";

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

  RecieveChatCommand() {

  }

  DiscardDestinationCard() {

  }

  getFaceUpCards(): FaceUpCards {
    return this.root.getFaceUpCards();
  }

  getNumTrainCardsRemaining() {
    return this.root.getNumTrainCardsRemaining();
  }

  getNumDestinationCardsRemaining() {
    return this.root.getNumDestinationCardsRemaining();
  }

}
