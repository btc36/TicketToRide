import { IngameClientRoot } from "../Models/IngameClientRoot";
import { Player } from "../Models/Player";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { TrainCard } from "../Models/TrainCard";
import { FaceUpCards } from "../Models/FaceUpCards";

export class IngameExternalClientFacade {
    root: IngameClientRoot
    claimRoute(player:Player, route:Route) {
        this.root.claimRoute(player, route);
    }

    addTrainCard(trainCard:TrainCard) {
        this.root.addTrainCard(trainCard);
    }

    updatePlayerPoints(player: Player, points:number) {
        this.root.updatePlayerPoints(player, points);
    }

    removeTrainCard(trainCard:TrainCard) {
        this.root.removeTrainCard(trainCard);
    }

    updateNumTrainCards(player:Player,numUsed:number) {
        this.root.updateNumTrainCars(player,numUsed)
    }

    updateNumTrainCars(player:Player,numCars:number) {
        this.root.updateNumTrainCars(player,numCars)
    }

    updateNumberOfDestinationCards(player:Player,numCards:number) {
        this.root.updateNumberOfDestinationCards(player,numCards)
    }

    setFaceUpCards(faceUpCards:FaceUpCards) {
        this.root.setFaceUpCards(faceUpCards);
    }

    updateNumInDeck(newNum:number) {
        this.root.updateNumInDeck(newNum)
    }

    updateNumDestinationCards(player:Player,numCards:number) {
        this.root.updateNumberOfDestinationCards(player, numCards);
    }

    changeTurn(player:Player) {
        this.root.changeTurn(player)
    }

    receiveChatCommand(success: boolean, errorMessage: string, gameid: string, chats: any[]){
        //test if it was a success, and if there was an error message
        this.root.receiveChatCommand(gameid, chats);
    }

    presentDestinationCard(success: boolean, errorMessage: string, destinationCards: any[]){
        //test if it was a success, and if there was an error message
        this.root.presentDestinationCard(destinationCards);
    }
    discardDestinationCard(success: boolean, errorMessage: string, destinationCards: any[]){
        //test if it was a success, and if there was an error message
        this.root.discardDestinationCard();
    }
    addDestinationCard(success: boolean, errorMessage: string, username: string, destinationCards: any[]){
        //test if it was a success, and if there was an error message
        for (var i = 0; i < destinationCards.length; i++){
            this.root.addDestinationCard(username, destinationCards[i]);
        }
    }

}