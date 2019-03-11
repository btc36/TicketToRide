import { IObserver } from "../ViewModels/IObserver";
import { Game } from "./Game";
import { Player } from "./Player";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";
import { AllRoutes, GameMap } from "./GameMap";
import { FaceUpCards } from "./FaceUpCards";
import { Session } from "./Session";
import { ISubject } from "./ISubject"
import { ChatMessage } from "./ChatMessage";
import { ChatRoom } from "./ChatRoom";
import {PlayerHand} from "./PlayerHand";


export class IngameClientRoot implements ISubject {
  observers: Array<IObserver>;
  game: Game; // a game
  session: Session;
  localPlayer: Player;

  constructor() {
    this.game = new Game();
    this.observers = new Array<IObserver>();
    this.localPlayer = new Player("ben");
  }

  randomize() {
    let ben = new Player("ben");
    let lincoln = new Player("lincoln");
    let brennah = new Player("Brennah");
    let jordan = new Player("Jordan");
    let jake = new Player("Jake");
    let rand = Math.floor(Math.random() * AllRoutes.length);
    ben.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, AllRoutes[rand].color)];
    rand = Math.floor(Math.random() * AllRoutes.length);
    lincoln.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, AllRoutes[rand].color)];
    rand = Math.floor(Math.random() * AllRoutes.length);
    brennah.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, AllRoutes[rand].color)];
    rand = Math.floor(Math.random() * AllRoutes.length);
    jordan.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, AllRoutes[rand].color)];
    rand = Math.floor(Math.random() * AllRoutes.length);
    jake.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, AllRoutes[rand].color)];
    this.game.setPlayerList([ ben, lincoln, brennah, jordan, jake]);
    this.notify("updatedPlayerList", this.game.getPlayerList());
  }

  setLocalPlayer(localPlayer: Player) {
    this.localPlayer = localPlayer;
  }

  getPlayerHand(): PlayerHand{
    return this.localPlayer.getHand();
  }
  getUsername():string{
    return this.localPlayer.getUsername();
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

  getGameID():string {
    return this.game.getGameID();
  }

  claimRoute(player: string, route: Route): void {
    this.game.claimRoute(player, route);
  }

 /* useTrainCard(trainCard: TrainCard): void {
    this.game.useTrainCard(trainCard);
  }

  addTrainCard(trainCard: TrainCard): void {
    this.game.addTrainCard(trainCard);
  }*/

  addTrainCards(username: string, trainCards: Array<TrainCard>)
  {
    for(let i = 0; i < trainCards.length; i++)
    {
      this.game.addTrainCard(username,trainCards[i]);
    }
  }

  addDestinationCard(username: string, destinationCards: Array<DestinationCard>) {
    this.game.addDestinationCard(username, destinationCards);
    this.localPlayer.drawDestinationCard(destinationCards);
    this.notify("keptDestination",null);
  }

  checkWinCondition(): Player {
    return this.game.checkWinCondition();
  }

  getPlayerList(): Array<Player> {
    return this.game.getPlayerList();
  }

  setPlayerList(playerList: Array<Player>)
  {
    this.game.setPlayerList(playerList);
  }
  getCurrentTurnIndex(): number {
    return this.game.getCurrentTurnIndex();
  }

  getGame(): Game
  {
    return this.game;
  }
  setGame(game: Game)
  {
    this.game = game;
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

  changeFaceUpCards() {
    this.game.drawTrainCard();
    this.notify('setFaceUpCards',null);
  }

  updatePlayerPoints(player: string, points: number): void {
    this.game.updatePlayerPoints(player, points);
  }

  /*removeTrainCard(trainCard: TrainCard): void {
    this.game.removeTrainCard(trainCard);
  }*/

  updateNumTrainCars(player: string, numUsed: number): void {
    this.game.updateNumTrainCars(player, numUsed);
  }

  updateNumberOfDestinationCards(player: string, numCards: number): void {
    this.game.setNumDestinationCards(player, numCards);
  }

  setNumTrainCards(player: string, numCards: number) {
    this.game.setNumTrainCards(player, numCards);
  }

  updateNumInDeck(newNum: number): void {
    this.game.setNumTrainCardsRemaining(newNum);
  }

  changeTurn(player: string): void {
    this.game.changeTurn(player);
  }

  receiveChatCommand(gameid: string, chats: any[]){
    this.game.setChatHistory(chats);
    this.notify("updateMessageList", chats);
  }
  
  presentDestinationCard(destinationCards: any[]){
    this.game.presentDestinationCard(destinationCards);
    this.notify("drawDestination", null);
  }

  getPresentedDestinationCards(): any[] {
    return this.game.getPresentedDestinationCards();
  }

  discardDestinationCard(){
    this.game.discardDestinationCard();
    this.notify("discardDestination", null);
  }

  /*removeTrainCard(trainCard){

  }

  addTrainCard(trainCard){

  }*/


}
