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

  RecieveChatCommand() {

  }

  DiscardDestinationCard(destinationCards: Array<DestinationCard>) {
    let gameId = "GAMEID";
    let username = "BENC";
    this.proxy.DiscardDestinationCard(gameId, username, destinationCards);
  }

  getFaceUpCards(): FaceUpCards {
    return this.root.getFaceUpCards();
  }

  getDestinationCards(): Array<DestinationCard> {
    return this.root.getPresentedDestinationCards();
  }
}
