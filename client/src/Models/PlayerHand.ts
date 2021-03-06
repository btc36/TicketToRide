import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { DestinationCardSelectionView } from "../Views/DestinationCardSelectionView";

export class PlayerHand {
    destinationCards: Array<DestinationCard>;
    trainCards: Array<TrainCard>;
    colorCountMap : Map<string, number>;

    /**
     * probably won't be necessary
     * @param destinationCard
     */
    // removeDestinationCard(destinationCard: DestinationCard):void {
    //   this.destinationCards.forEach( (item, index) => {
    //     if(item === destinationCard) this.destinationCards.splice(index,1);
    //     });
    // }

    constructor() {
      this.destinationCards = new Array<DestinationCard>();
      this.trainCards = new Array<TrainCard>();
      this.colorCountMap = new Map<string, number>();
    }

    getDestinationCards(): Array<DestinationCard> {
      return this.destinationCards;
    }

    getTrainCards(): Array<TrainCard> {
      return this.trainCards;
    }

    getColorMap(): Map<string, number> {
      return this.colorCountMap;
    }

    addDestinationCard(destinationCard: Array<DestinationCard>): void {
      this.destinationCards = this.destinationCards.concat(destinationCard);
    }

    clearTrainCards(): void {
      this.trainCards = new Array<TrainCard>();
    }

    /**
     * remove it from the end
     * @param trainCard
     */
    removeTrainCard(trainCard: TrainCard):void{
      this.trainCards.forEach( (item, index) => {
            if(item === trainCard) this.trainCards.splice(index,1);
        });
    }

    addTrainCard(trainCard: TrainCard): void {
      this.trainCards.push(trainCard);
      this.refactorColorCountMap();
    }

    refactorColorCountMap(): void {
      this.colorCountMap = new Map<string, number>();
      this.trainCards.forEach((trainCard) => {
        const color = trainCard.color;
        let count = 0;
        if (this.colorCountMap.get(color) != null){
          count = this.colorCountMap.get(color);
        }
        this.colorCountMap.set(color, count + 1);
      });
    }
}
