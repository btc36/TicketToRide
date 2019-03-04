import { IObserver } from "../ViewModels/IObserver";
import { Game } from "./Game";
import { Player } from "./Player";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";
import { GameMap } from "./GameMap";
import { FaceUpCards } from "./FaceUpCards";

export class IngameClientRoot {
    observers: Array<IObserver>;
    game: Game;

	constructor (){
        this.game = new Game();
        this.observers = new Array<IObserver>();
    }

    transitionPage(pageName: string): void {

    }

    claimRoute(player: Player, route:Route):void {

    }

    useTrainCard(trainCard: TrainCard):void{

    }

    addTrainCard(trainCard: TrainCard):void{

    }

    addDestinationCard(destinationCards: Array<DestinationCard>) {

    }

    checkWinCondition(): Player {
        return null;
    }

    getPlayerList(): Array<Player> {
        return null;
    }

    getCurrentTurnIndex(): number {
        return null;
    }

    getMap(): GameMap {
        return null;
    }

    getFaceUpCards(): FaceUpCards {
        return null;
    }

    setFaceUpCards(faceUpCards:FaceUpCards): void {

    }

    updatePlayerPoints(player: Player, points: number):void {

    }

    removeTrainCard(trainCard:TrainCard): void {

    }

    updateNumTrainCars(player: Player, numUsed: number): void {

    }

    updateNumberOfDestinationCards(player: Player, numCards: number): void {

    }

    updateNumInDeck(newNum:number):void {

    }

    updateNumDestinationCards(newNum: number): void {

    }

    changeTurn(player: Player):void {

    }



}