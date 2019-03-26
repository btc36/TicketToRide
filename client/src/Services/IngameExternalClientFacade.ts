import { IngameClientRoot } from "../Models/IngameClientRoot";
import { Player } from "../Models/Player";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { TrainCard } from "../Models/TrainCard";
import { FaceUpCards } from "../Models/FaceUpCards";

// operations on the model
export class IngameExternalClientFacade {
    setPlayerList(gamePlayers: Player[]): any {
      this.root.setPlayerList(gamePlayers);
    }
  setLocalPlayer(player: Player): any {
    console.log("SETTING PLAYER");
    console.log(player);
      this.root.setLocalPlayer(player.getUsername());
    }
  root: IngameClientRoot

  constructor(root:IngameClientRoot) {
    this.root = root;
  }

  claimRoute(success: boolean, message: string, gameID: string, username: string, route:Route) {
    if(success) {
      this.root.claimRoute(username, route);
    }
    else {
      alert(message);
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

  updateNumTrainCards(player:string,numUsed:number) {
    this.root.updateNumTrainCars(player,numUsed)
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
    this.root.endGame(username);
  }

}
