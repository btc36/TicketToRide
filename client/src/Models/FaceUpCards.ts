import { TrainCard } from "./TrainCard";

export class FaceUpCards {

  /**
  * @invariant in our current implentation, faceUpCards.length == 5
  **/
  faceUpCards: Array<TrainCard>;

  /**
   * Constructor
   * @pre faceUpCards param != null
   * @pre faceUpCards param is a valid array of type Array<TrainCard>
   * @post this.faceUpCards = faceUpCards
   */
  constructor(faceUpCards: Array<TrainCard>) {
    this.faceUpCards = faceUpCards;
  }

  /**
   * @post return value != null
   * @post return value is a valid object of type Array<TrainCard>
   * @return returns the current deck of face up cards
   */
  getCards(): Array<TrainCard> {
    return this.faceUpCards;
  }

   /**
   * replaces card at a certain index with newCard
   * @pre param index < faceUpCards.length
   * @pre param newCard != null
   * @pre param newCard is a valid object of type TrainCard
   * @post faceUpCards[index] overwritten with param newCard
   * @return the card that was overwritten
   */
  drawCard(index: number, newCard: TrainCard): TrainCard {
    let cardDrawn = this.faceUpCards[index];
    this.faceUpCards[index] = newCard;
    return cardDrawn;
  }

 /**
 * replaces faceUpCards with param newSet, returns the old faceUpCards. Currently used when we need to replace set of 5 cards.
 * @pre param newSet != null
 * @pre param newSet is a valid object of type Array<TrainCard>
 * @pre In the current implementation, param newSet.length == 5
 * @post faceUpCards overwritten with param newSet
 * @post In the current implementation length of returned deck == 5
 * @invariant this.faceUpCards.length == 5
 * @return the overwritten deck
 */
  replaceDeck(newSet: Array<TrainCard>): Array<TrainCard> {
    let oldSetofFive = this.faceUpCards
    this.faceUpCards = newSet;
    return oldSetofFive;
  }

   /**
   * Tells if there are 3 or more wild cards in the deck this.faceUpCards
   * @post faceUpCards overwritten with param newSet
   * @post returned boolean will be true if there are three or more wild cards, otherwise false.
   * @post returned boolean != null
   * @return boolean that is true if there are three or more wild cards, otherwise false.
   */
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
