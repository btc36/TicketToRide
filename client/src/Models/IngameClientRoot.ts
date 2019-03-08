import { IObserver } from "../ViewModels/IObserver";
import { Game } from "./Game";
import { Player } from "./Player";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";
import { GameMap } from "./GameMap";
import { FaceUpCards } from "./FaceUpCards";
import { Session } from "./Session";
import { ISubject } from "./ISubject"


export class IngameClientRoot implements ISubject {
  observers: Array<IObserver>;
  game: Game;
  session: Session;

  constructor() {
    this.game = new Game();
    this.observers = new Array<IObserver>();
  }

  transitionPage(pageName: string): void {
    this.session.setCurrentPage(pageName);
    this.notify("transitionPage", pageName);
  }

  notify(updateType: string, data: any) {
    for (const o of this.observers) {
      if (o != null) {
        o.update(updateType, data);
      }
    }
  }

  public attach(o: IObserver) {
    this.observers.push(o);
  }

  public detach(o: IObserver) {

  }

  claimRoute(player: Player, route: Route): void {
    this.game.claimRoute(player, route);
  }

  useTrainCard(trainCard: TrainCard): void {
    this.game.useTrainCard(trainCard);
  }

  addTrainCard(trainCard: TrainCard): void {
    this.game.addTrainCard(trainCard);
  }

  addDestinationCard(username: string, destinationCard: DestinationCard) {
    this.game.addDestinationCard(username,destinationCard);
  }

  checkWinCondition(): Player {
    return this.game.checkWinCondition();
  }

  getPlayerList(): Array<Player> {
    return this.game.getPlayerList();
  }

  getCurrentTurnIndex(): number {
    return this.game.getCurrentTurnIndex();
  }

  getMap(): GameMap {
    return this.game.getMap();
  }

  getFaceUpCards(): FaceUpCards {
    return this.game.getFaceUpCards();
  }

  setFaceUpCards(faceUpCards: FaceUpCards): void {
    this.game.setFaceUpCards(faceUpCards);
  }

  updatePlayerPoints(player: Player, points: number): void {
    this.game.updatePlayerPoints(player, points);
  }

  removeTrainCard(trainCard: TrainCard): void {
    this.game.removeTrainCard(trainCard);
  }

  updateNumTrainCars(player: Player, numUsed: number): void {
    this.game.updateNumTrainCars(player, numUsed);
  }

  updateNumberOfDestinationCards(player: Player, numCards: number): void {
    this.game.updateNumberOfDestinationCards(player, numCards);
  }

  updateNumInDeck(newNum: number): void {
    this.game.updateNumInDeck(newNum);
  }

  changeTurn(player: Player): void {
    this.game.changeTurn(player);
  }

  receiveChatCommand(gameid: string, chats: any[]){
    this.game.setChatHistory(chats);
  }
  presentDestinationCard(destinationCards: any[]){
    this.game.presentDestinationCard(destinationCards);
  }

  discardDestinationCard(){
    this.game.discardDestinationCard();
  }


}
