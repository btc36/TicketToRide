import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";

export class Game {
    players: Array<Player>;
    whoseTurn: number;
    map: GameMap;
    DestinationCardsDeckSize: number
    trainCardDeckSize: number;
    faceUpCards: FaceUpCards;

    checkWinCondition(): Player {
        return null;
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
}