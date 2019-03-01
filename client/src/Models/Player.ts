import { PlayerHand } from "./PlayerHand";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";

export class Player {
  username: string;
    myHand: PlayerHand;
    trainCars: number;
    color: string;
    score: number;
    connectedCities: Array<Array<string>>;
    ownedRoutes: Array<Route>;


  constructor(username: string) {
    this.username = username;
  }
  
  getUsername(): string {
    return this.username;
    }

    //Acts as a constructor for when actual gameplay starts
    initiateGame() {

    }

    claimRoute(route: Route, length: number):void {

    }

    drawTrainCard(trainCard: TrainCard):void {

    }

    drawDestinationCard(destinationCard: DestinationCard):void {

    }

}
