import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";
import { Route } from "./Route";
import { ChatRoom } from "./ChatRoom";
import { ChatMessage } from "./ChatMessage";

export class Game {
  players: Array<Player>;
  whoseTurn: number;
  map: GameMap;
  numDestinationCardsRemaining: number;
  numTrainCardsRemaining: number;
  faceUpCards: FaceUpCards;
  chatRoom: ChatRoom

  constructor() {
    let trainCards = Array<TrainCard>();
    trainCards.push(new TrainCard("green"));
    trainCards.push(new TrainCard("blue"));
    trainCards.push(new TrainCard("black"));
    trainCards.push(new TrainCard("rainbow"));
    trainCards.push(new TrainCard("green"));
    this.setFaceUpCards(new FaceUpCards(trainCards));
  }

  checkWinCondition(): Player {
    let maxPoints = 0;
    let winningPlayer = null;
    this.players.forEach((player) => {
      let score = player.getScore();
      if (score > maxPoints) {
        maxPoints = score;
        winningPlayer = player;
      }
    });
    return winningPlayer;
  }

  getChatHistory(): Array<ChatMessage> {
    return this.chatRoom.getChatHistory();
  }

  addChatMessage(chat: ChatMessage) {
    this.chatRoom.addChat(chat);
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

  getnumDestinationCardsRemaining(): number {
    return this.numDestinationCardsRemaining;
  }

  getNumTrainCardsRemaining(): number {
    return this.numTrainCardsRemaining;
  }

  getFaceUpCards(): FaceUpCards {
    return this.faceUpCards;
  }

  claimRoute(player: Player, route: Route): void {

  }

  useTrainCard(trainCard: TrainCard): void {

  }

  addTrainCard(trainCard: TrainCard): void {

  }

  addDestinationCard(player: Player, destinationCard: DestinationCard) {
    this.players.forEach((thisPlayer) => {
      if (thisPlayer.getUsername == player.getUsername) {
        thisPlayer.drawDestinationCard(destinationCard);
        return;
      }
    });

  }

  setFaceUpCards(faceUpCards: FaceUpCards): void {
    this.faceUpCards = faceUpCards;
  }

  updatePlayerPoints(player: Player, points: number): void {

  }

  removeTrainCard(trainCard: TrainCard): void {

  }

  updateNumTrainCars(player: Player, numUsed: number): void {

  }

  updateNumberOfDestinationCards(player: Player, numCards: number): void {

  }

  updateNumInDeck(newNum: number): void {

  }

  changeTurn(player: Player): void {

  }
}
