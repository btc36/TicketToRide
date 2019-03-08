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
    myTurn: boolean;
    numTrainCards: number;
    numDestinationCards: number;
    isOtherPlayer: boolean;


  constructor(username: string) {
    this.username = username;
  }
  
  getUsername(): string {
    return this.username;
    }

    //Acts as a constructor for when actual gameplay starts
    initiateGame(myHand:PlayerHand,trainCards:number,color:string,numTrainCards:number,numDestinationCards:number,isOtherPlayer:boolean) {
        this.myHand = myHand;
        this.trainCars = trainCards;
        this.color = color;
        this.numTrainCards = numTrainCards;
        this.numDestinationCards = numDestinationCards;
        this.isOtherPlayer = isOtherPlayer;
        this.connectedCities = new Array<Array<string>>();
        this.ownedRoutes = new Array<Route>();
        this.myTurn = false;
    }

    claimRoute(route: Route): void {
        this.ownedRoutes.push(route);
        let length = route.getLength();
        if (length == 1) {
            this.score += 1;
        }
        else if (length == 2) {
            this.score += 2;
        } else if (length == 3) {
            this.score += 4;
        } else if (length == 4) {
            this.score += 7;
        } else if (length == 5) {
            this.score += 10;
        } else if (length == 6) {
            this.score += 15;
        }
    }

    drawTrainCard(trainCard: TrainCard):void {
        this.myHand.addTrainCard(trainCard);
    }

    drawDestinationCard(destinationCard: DestinationCard):void {
        this.myHand.addDestinationCard(destinationCard);
    }

    getScore(): number {
        return this.score;
    }

    setScore(newScore: number) {
        this.score = newScore;
    }

    useTrainCard(trainCard: TrainCard,numUsed:number) {
        
    }

    setNumTrainCars(numCars: number) {
        this.trainCars -= numCars;
    }

    setTurn(isMyTurn: boolean) {
        this.myTurn = isMyTurn;
    }

}
