import { PlayerHand } from "./PlayerHand";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";
import {string} from "prop-types";

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
  colorCountMap : Map<string, number>;


  constructor(username: string) {
    this.username = username;
    this.myHand = new PlayerHand();
    this.colorCountMap = new Map<string, number>();
  }

  getUsername(): string {
    return this.username;
  }

  getHand(): PlayerHand{
    /*let currCard = new TrainCard("blue");
      this.myHand.addTrainCard(currCard);
      let dCard = new DestinationCard("alabama", "provo", 8)
      this.myHand.addDestinationCard([dCard]);*/
    return this.myHand
  }

  //Acts as a constructor for when actual gameplay starts
  initiateGame(myHand:PlayerHand,trainCards:number,color:string,numTrainCards:number,numDestinationCards:number,isOtherPlayer:boolean) {
    this.myHand = myHand;
    this.trainCars = 45;
    this.color = color;
    this.numTrainCards = numTrainCards;
    this.numDestinationCards = numDestinationCards;
    this.isOtherPlayer = isOtherPlayer;
    this.connectedCities = new Array<Array<string>>();
    this.ownedRoutes = new Array<Route>();
    this.ownedRoutes.push(new Route("Seattle", "Portland", 1, "grey"));
    this.myTurn = false;
    if (numDestinationCards == 3){
      this.myTurn = true;
    }
    this.colorCountMap = new Map<string, number>();
  }

  /**
   * claim routes and increment scores accordingly
   * @param route
   */
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

  /**
   * draw traincard and give it to the hand?
   * @param trainCard
   */
  drawTrainCard(trainCard: TrainCard):void {
    this.myHand.addTrainCard(trainCard);
    const color = trainCard.getColor();
    let count = 0;
      if (this.colorCountMap.get(color) != null){
        count = this.colorCountMap.get(color);
      }
    this.colorCountMap.set(color, count + 1);
  }

  /**
   * draw destination card and give it to the hand?
   * @param destinationCard
   */
  drawDestinationCard(destinationCard: Array<DestinationCard>):void {
    this.myHand.addDestinationCard(destinationCard);
  }
  getColorCountMap() : Map<string,number>{
    return this.colorCountMap;
  }
  getScore(): number {
    return this.score;
  }

  getOwnedRoutes(): Array<Route> {
    return this.ownedRoutes;
  }

  setScore(newScore: number) {
    this.score = newScore;
  }

  // There is no useDestinationCard because you can't get rid of them

  useTrainCard(trainCard: TrainCard,numUsed:number) {
    this.myHand.removeTrainCard(trainCard);
  }

  setNumTrainCars(numCars: number) {
    this.trainCars -= numCars;
  }

  setTurn(isMyTurn: boolean) {
    this.myTurn = isMyTurn;
  }

  setNumTrainCards(numCards:number){
    this.numTrainCards = numCards;
  }

  setNumDestinationCards(numCards:number){
    this.numDestinationCards = numCards
  }

  getNumTrainCars(): number {
    return this.trainCars;
  }


}
