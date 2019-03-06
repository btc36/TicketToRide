import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";
import { Route } from "./Route";

export class Game {
    players: Array<Player>;
    whoseTurn: number;
    map: GameMap;
    DestinationCardsDeckSize: number
    trainCardDeckSize: number;
    faceUpCards: FaceUpCards;

    checkWinCondition(): Player {
        let maxPoints = 0;
        let winningPlayer = null;
        this.players.forEach((player) => {
            let score = player.getScore();
            if (score > maxPoints) {
                maxPoints = score;
                winningPlayer = player;
            }
        });
        return winningPlayer;
    }

    getPlayerList(): Array<Player> {
        return this.players;
    }

    getCurrentTurnIndex(): number {
        return this.whoseTurn;
    }

    getMap(): GameMap {
        return this.map;
    }

    getDestinationCardsDeckSize(): number{
        return this.DestinationCardsDeckSize;
    }

    getTrainCardDeckSize(): number {
        return this.trainCardDeckSize;
    }

    getFaceUpCards(): FaceUpCards {
        return this.faceUpCards;
    }

    claimRoute(player: Player, route: Route): void {

    }

    useTrainCard(trainCard: TrainCard): void {

    }

    addTrainCard(trainCard: TrainCard): void {

    }

    addDestinationCard(destinationCards: Array<DestinationCard>) {

    }

    setFaceUpCards(faceUpCards: FaceUpCards): void {

    }

    updatePlayerPoints(player: Player, points: number): void {

    }

    removeTrainCard(trainCard: TrainCard): void {

    }

    updateNumTrainCars(player: Player, numUsed: number): void {

    }

    updateNumberOfDestinationCards(player: Player, numCards: number): void {

    }

    updateNumInDeck(newNum: number): void {

    }

    changeTurn(player: Player): void {

    }
}