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
    let rand = Math.floor(Math.random() * AllRoutes.length);
    ben.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, "blue")];
    rand = Math.floor(Math.random() * AllRoutes.length);
    lincoln.ownedRoutes = [new Route(AllRoutes[rand].cityOne, AllRoutes[rand].cityTwo, AllRoutes[rand].length, "red")];
    this.game.setPlayerList([ ben, lincoln]);
    this.notify("updatedPlayerList", this.game.getPlayerList());
    this.notify("playerInfoChanged", null);
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

  setGameID(gameId: string) {
    this.game.setGameID(gameId);
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
    console.log("AHAHAHAHAHAHHAHAH");
    console.log(destinationCards);
    this.game.addDestinationCard(username, destinationCards);
    this.localPlayer.drawDestinationCard(destinationCards);
    this.notify("keptDestination", null);
    this.notify("myHandUpdated", null);
    this.notify("playerInfoChanged", null);

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
    console.log("MY GAME IS !!!!!!!!!!!!!")
    console.log(game);
    this.game.setGameID(game.gameID);
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
    let drawnCard = this.game.drawTrainCard();
    this.localPlayer.drawTrainCard(drawnCard);
    this.notify('setFaceUpCards', null);
    this.notify("myHandUpdated", null);
    this.notify("playerInfoChanged", null);
    console.log(this.game);
    console.log(this.localPlayer);
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

  setNumDestinationCardsRemaining( newNum: number): void {
    this.game.setNumDestinationCardsRemaining(newNum);
  }

  setNumTrainCardsRemaining(newNum: number): void {
    this.game.setNumTrainCardsRemaining(newNum);
  }

  changeTurn(player: string): void {
    this.game.changeTurn(player);
    this.notify("playerInfoChanged", null);
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
