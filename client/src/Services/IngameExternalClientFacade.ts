import { IngameClientRoot } from "../Models/IngameClientRoot";
import { Player } from "../Models/Player";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { TrainCard } from "../Models/TrainCard";
import { FaceUpCards } from "../Models/FaceUpCards";

// operations on the model
export class IngameExternalClientFacade {
  root: IngameClientRoot

  constructor(root:IngameClientRoot) {
    this.root = root;
  }

  claimRoute(player:string, route:Route) {
    this.root.claimRoute(player, route);
  }

  /*addTrainCard(trainCard:TrainCard) {
    this.root.addTrainCard(trainCard);
  }*/

  setLocalPlayer(localPlayer: Player) {
    this.root.setLocalPlayer(localPlayer);
  }

  setPlayerList(players: Array<Player>) {
    this.root.setPlayerList(players);
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

}
