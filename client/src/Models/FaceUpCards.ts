import { TrainCard } from "./TrainCard";

export class FaceUpCards {
    faceUpCards: Array<TrainCard>;

    //Whenever a a card is drawn, it is replaced with a new card in it's spot
    drawCard(index: number, newCard: TrainCard): TrainCard {
        let cardDrawn = this.faceUpCards[index];
        this.faceUpCards[index] = newCard;
        return cardDrawn;
    }

    //This is for use when all 5 cards need to be replaced at once
    replaceDeck(newSet: Array<TrainCard>): Array<TrainCard> {
        let oldSetofFive = this.faceUpCards
        this.faceUpCards = newSet;
        return oldSetofFive;
    }


    isThreeOrMoreWildCard(): boolean {
        let numWild = 0;
        for (let card of this.faceUpCards) {
            if (card.color == "wild") {
                numWild += 1;
            }

        }
        if (numWild >= 3) {
            return true;
        } else {
            return false;
        }
    }
}