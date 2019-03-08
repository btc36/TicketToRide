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
import { ChatMessage } from "./ChatMessage";
import { ChatRoom } from "./ChatRoom";


export class IngameClientRoot implements ISubject {
  observers: Array<IObserver>;
  game: Game;
  session: Session;

  constructor() {
    let players = new Array<Player>();
    let whoseTurn = 0;
    let map = new GameMap();
    let numDestinationCardsRemaining = 1;
    let numTrainCardsRemaining = 1;
    let trainCards = Array<TrainCard>();
    trainCards.push(new TrainCard("green"));
    trainCards.push(new TrainCard("blue"));
    trainCards.push(new TrainCard("black"));
    trainCards.push(new TrainCard("rainbow"));
    trainCards.push(new TrainCard("blue"));
    let faceUpCards = new FaceUpCards(trainCards);
    let chatRoom = new ChatRoom("", new Array<ChatMessage>());
    this.game = new Game(players, whoseTurn, map, numDestinationCardsRemaining, numTrainCardsRemaining, faceUpCards, chatRoom);
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

 /* useTrainCard(trainCard: TrainCard): void {
    this.game.useTrainCard(trainCard);
  }

  addTrainCard(trainCard: TrainCard): void {
    this.game.addTrainCard(trainCard);
  }*/

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

  getNumTrainCardsRemaining() {
    return this.game.getNumTrainCardsRemaining();
  }

  getNumDestinationCardsRemaining() {
    return this.game.getNumDestinationCardsRemaining();
  }

  setFaceUpCards(faceUpCards: FaceUpCards): void {
    this.game.setFaceUpCards(faceUpCards);
    this.notify("setFaceUpCards", faceUpCards);
  }

  updatePlayerPoints(player: Player, points: number): void {
    this.game.updatePlayerPoints(player, points);
  }

  /*removeTrainCard(trainCard: TrainCard): void {
    this.game.removeTrainCard(trainCard);
  }*/

  updateNumTrainCars(player: Player, numUsed: number): void {
    this.game.updateNumTrainCars(player, numUsed);
  }

  updateNumberOfDestinationCards(player: Player, numCards: number): void {
    this.game.setNumDestinationCards(player, numCards);
  }

  setNumTrainCards(player: Player, numCards: number) {
    this.game.setNumTrainCards(player, numCards);
  }

  updateNumInDeck(newNum: number): void {
    this.game.setNumTrainCardsRemaining(newNum);
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

  removeTrainCard(trainCard){

  }

  addTrainCard(trainCard){

  }


}
