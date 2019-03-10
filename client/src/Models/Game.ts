import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";
import { Route } from "./Route";
import { ChatRoom } from "./ChatRoom";
import { ChatMessage } from "./ChatMessage";
import { Map } from "google-maps-react";

export class Game {
    //gameID: string;
    players: Array<Player>;
    whoseTurn: number;
    map: GameMap;
    numDestinationCardsRemaining: number;
    numTrainCardsRemaining: number;
    faceUpCards: FaceUpCards;
    chatRoom: ChatRoom;
    potentialDestinationCards: Array<DestinationCard>;
    gameID: string;

  constructor() {
    this.gameID = "EPICGAME";
        this.players = [];
        this.whoseTurn = 1;
        this.map = new GameMap();
        this.numDestinationCardsRemaining = 50;
        this.numTrainCardsRemaining = 50;
    this.faceUpCards = new FaceUpCards([new TrainCard("blue"), new TrainCard("blue"), new TrainCard("pink"), new TrainCard("brown"), new TrainCard("yellow")]);
      this.chatRoom = new ChatRoom("thisGame", [new ChatMessage("BEN", "Hello, World!", new Date())]);
      this.potentialDestinationCards = [new DestinationCard("Salt Lake", "Miami", 15), new DestinationCard("Boston", "Chicago", 10), new DestinationCard("Sacramento", "Mesa", 5)];
    }

    getGameId() {
      return this.gameID;
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

    setChatHistory(chats: Array<ChatMessage>) {
        this.chatRoom.setChatHistory(chats);
    }

    setPlayerList(list: Array<Player>) {
        this.players = list;
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

    getNumDestinationCardsRemaining(): number {
        return this.numDestinationCardsRemaining;
    }

    getNumTrainCardsRemaining(): number {
        return this.numTrainCardsRemaining;
    }

    getFaceUpCards(): FaceUpCards {
        return this.faceUpCards;
    }

  claimRoute(username: string, route: Route): void {
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
                player.claimRoute(route);
                return;
            }
        });
    }

  useTrainCard(username: string, trainCard: TrainCard,numUsed:number): void {
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
                player.useTrainCard(trainCard,numUsed);
                return;
            }
        });
    }

  addTrainCard(username: string, trainCard: TrainCard): void {
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
                player.drawTrainCard(trainCard);
                return;
            }
        });
    }

    addDestinationCard(username: string, destinationCards: Array<DestinationCard>) {
        this.players.forEach((thisPlayer) => {
            if (thisPlayer.getUsername() == username) {
                thisPlayer.drawDestinationCard(destinationCards);
                return;
            }
        });

    }

    setFaceUpCards(faceUpCards: FaceUpCards): void {
        this.faceUpCards = faceUpCards;
    }

  updatePlayerPoints(username: string, points: number): void {
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
                player.setScore(points);
                return;
            }
        });
    }


  updateNumTrainCars(username: string, numUsed: number): void {
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
                player.setNumTrainCars(numUsed)
                return;
            }
        });
    }

    setNumDestinationCardsRemaining( newNum: number): void {
        this.numDestinationCardsRemaining = newNum;
    }

    setNumTrainCardsRemaining(newNum: number): void {
        this.numTrainCardsRemaining = newNum;
    }

  setNumTrainCards(username: string,numCards:number) {
    this.players.forEach((player) => {
      if (player.getUsername() == username) {
        player.setNumTrainCars(numCards);
        return;
      }
    });
  }

  setNumDestinationCards(username: string, numCards: number) {
    this.players.forEach((player) => {
      if (player.getUsername() == username) {
        player.setNumDestinationCards(numCards)
        return;
      }
    });
  }

  presentDestinationCard(destinationCards: any[]){
    this.potentialDestinationCards = destinationCards;
  }

  getPresentedDestinationCards(): any[] {
    return this.potentialDestinationCards;
  }

    discardDestinationCard(){
        this.potentialDestinationCards.length = 0;
    }

  changeTurn(username: string): void {
    this.players.forEach((player) => {
        if (player.getUsername() == username) {
            player.setTurn(true);
        } else {
            player.setTurn(false);
        }
    });
  }
}
