import { PlayerHand } from "./PlayerHand";
import { Route } from "./Route";
import { TrainCard } from "./TrainCard";
import { DestinationCard } from "./DestinationCard";
import {string} from "prop-types";

export class Player {
  username: string;
  myHand: PlayerHand;
  numTrains: number;
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
    this.numTrainCards = 4;
    this.numDestinationCards = 0;
    this.numTrains = 45;
  }

  isMyTurn(): boolean {
    return this.myTurn;
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
    this.numTrains = 45;
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
    this.numTrains -= length;
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
    this.numTrainCards += 1;
    const color = trainCard.color;
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
    // one that gets handed to Players
    this.numDestinationCards += destinationCard.length;
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

  subtractNumTrains(numTrains: number) {
    this.numTrains -= numTrains;
  }

  setNumTrains(numTrains: number) {
    this.numTrains = numTrains;
  }

  setTurn(isMyTurn: boolean) {
    this.myTurn = isMyTurn;
  }

  setNumTrainCards(numCards:number){
    this.numTrainCards = numCards;
  }

  getNumDestinationCards(): number{
    return this.numDestinationCards;
  }

  setNumDestinationCards(numCards:number){
    this.numDestinationCards = numCards
  }

  getNumTrains(): number {
    return this.numTrains;
  }

  getNumTrainCards() {
    return this.numTrainCards;
  }


}
