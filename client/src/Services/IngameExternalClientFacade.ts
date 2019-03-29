import { IngameClientRoot } from "../Models/IngameClientRoot";
import { Player } from "../Models/Player";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { TrainCard } from "../Models/TrainCard";
import { FaceUpCards } from "../Models/FaceUpCards";
import { IngameServerProxy } from "../Server/IngameServerProxy";

// operations on the model
export class IngameExternalClientFacade {
  root: IngameClientRoot
  proxy: IngameServerProxy;

  setPlayerList(gamePlayers: Player[]): any {
    this.root.setPlayerList(gamePlayers);
  }

  setLocalPlayer(player: Player): any {
    console.log(player);
      this.root.setLocalPlayer(player.getUsername());
  }

  constructor(root:IngameClientRoot) {
    this.root = root;
  }

  setClaimedRoutes(routes: Route[]) {
    this.root.setClaimedRoutes(routes);
  }

  claimRoute(success: boolean, message: string, gameID?: string, username?: string, route?:Route) {
    if(success == false) {
      alert(message);
    }
    else {
      this.SendChatCommand("Claimed route from " + route.getCities()[0] + " to " + route.getCities()[1]);
      this.root.claimRoute(username, route);
      this.root.endTurn();
      this.proxy.endTurn(this.root.getGameID(), this.root.getLocalPlayer());
    }
  }

  /*addTrainCard(trainCard:TrainCard) {
    this.root.addTrainCard(trainCard);
  }*/

  drawTrainCard(success: boolean, message: string, gameID: string, username: string, result: Array<TrainCard>, faceUpCards: FaceUpCards) {
    if (success) {
      this.root.addTrainCards(username, result);
      this.root.setFaceUpCards(faceUpCards);
    } else {
      alert(message);
    }

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

  updatePlayerPoints(player: string, points:number) {
    this.root.updatePlayerPoints(player, points);
  }

  /*removeTrainCard(trainCard:TrainCard) {
    this.root.removeTrainCard(trainCard);
  }*/

  // username (aka. player:string)
  storeTrainCards(username: string, trainCards: Array<TrainCard>)
  {
    this.root.addTrainCards(username, trainCards);
    //this.root.nextTurn();
  }

  //
  // updateNumTrainCards(player:string,numUsed:number) {
  //   this.root.updateNumTrainCars(player,numUsed)
  // }

  updateTrainCardsInHand(cards: any) {
    this.root.updateTrainCardsInHand(cards);
  }

  updateNumTrainCardsInHand(player:string,numRemaining:number) {
    this.root.setNumTrainCards(player,numRemaining)
  }


  updateNumTrainCars(player: string,numCars:number) {
    this.root.updateNumTrainCars(player,numCars)
  }

  updateNumberOfDestinationCards(player: string,numCards:number) {
    this.root.updateNumberOfDestinationCards(player,numCards)
  }

  setFaceUpCards(faceUpCards:FaceUpCards) {
    this.root.setFaceUpCards(faceUpCards);
  }

  setGameId(gameId: string) {
    this.root.setGameID(gameId);
  }

  updateNumInDeck(newNum:number) {
    this.root.updateNumInDeck(newNum)
  }

  updateNumDestinationCards(player: string,numCards:number) {
    this.root.updateNumberOfDestinationCards(player, numCards);
  }

  setGame(game: any) {
    this.root.setGame(game);
  }

  // number of total in the gmae
  setNumDestinationCardsRemaining( newNum: number): void {
    this.root.setNumDestinationCardsRemaining(newNum);
  }

  setNumTrainCardsRemaining(newNum: number): void {
    this.root.setNumTrainCardsRemaining(newNum);
  }

  changeTurn(player: string) {
    this.root.changeTurn(player)
  }

  receiveChatCommand(success: boolean, errorMessage: string, gameID: string, chats: any[]){
    //TODO: test if it was a success, and if there was an error message
    this.root.receiveChatCommand(gameID, chats);
  }

  presentDestinationCard(success: boolean, errorMessage: string, destinationCards: any[]){
    //TODO: test if it was a success, and if there was an error message
    this.root.presentDestinationCard(destinationCards);
  }
  discardDestinationCard(success: boolean, errorMessage: string, destinationCards: any[]){
    //TODO: test if it was a success, and if there was an error message
    this.root.discardDestinationCard();
  }
  addDestinationCard(success: boolean, errorMessage: string, username: string, destinationCards: any[]){
    //TODO: test if it was a success, and if there was an error message
    for (var i = 0; i < destinationCards.length; i++){
      this.root.addDestinationCard(username, destinationCards[i]);
    }
    //this.root.nextTurn();
  }
  currentTurn(username: string){
    this.root.currentTurn(username);
  }
  updateScores(scores: number[]){
    this.root.updateScores(scores);
  }
  endGame(username: string){
    //this.root.endGame(username);
  }
  lastRound()
  {
    this.SendChatCommand("It is the last round.");
    this.root.lastRound();
  }

}
