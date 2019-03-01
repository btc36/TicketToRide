import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";

export class Game {
    players: Array<Player>;
    whoseTurn: number;
    map: GameMap;
    DestinationCardsDeck: Array<DestinationCard>
    trainCardDeck: Array<TrainCard>;
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

    getDestinationCardsDeck(): Array<DestinationCard>{
        return this.DestinationCardsDeck
    }

    getTrainCardDeck(): Array<TrainCard> {
        return this.trainCardDeck;
    }

    getFaceUpCards(): FaceUpCards {
        return this.faceUpCards;
    }
}