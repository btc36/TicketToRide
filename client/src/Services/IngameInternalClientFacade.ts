import { IngameServerProxy } from "../Server/IngameServerProxy";
import { IngameClientRoot } from "../Models/IngameClientRoot";
import { FaceUpCards } from "../Models/FaceUpCards";

export class IngameInternalClientFacade {
  proxy: IngameServerProxy;
  root: IngameClientRoot;

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
}
