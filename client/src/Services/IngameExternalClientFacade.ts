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

    addDestinationCard(destinationCards: Array<DestinationCard>) {
        this.root.addDestinationCard(destinationCards);
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

}