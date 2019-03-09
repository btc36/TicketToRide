import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";

export class PlayerHand {
    destinationCards: Array<DestinationCard>;
    trainCards: Array<TrainCard>;

    /**
     * probably won't be necessary
     * @param destinationCard
     */
    // removeDestinationCard(destinationCard: DestinationCard):void {
    //   this.destinationCards.forEach( (item, index) => {
    //     if(item === destinationCard) this.destinationCards.splice(index,1);
    //     });
    // }

    addDestinationCard(destinationCard: DestinationCard): void {
      this.destinationCards.push(destinationCard);
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
    }
}