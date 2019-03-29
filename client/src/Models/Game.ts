import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { DestinationCard } from "./DestinationCard";
import { TrainCard } from "./TrainCard";
import { FaceUpCards } from "./FaceUpCards";
import { Route } from "./Route";
import { ChatRoom } from "./ChatRoom";
import { ChatMessage } from "./ChatMessage";
import { Map } from "google-maps-react";
import { PlayerHand } from "./PlayerHand";

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
    winner: string;

  constructor() {
    this.gameID = "EPICGAME";
      this.players = new Array<Player>();
      //this.players = [new Player("Ben"),new Player("lincoln")]//.initiateGame(new PlayerHand(),40,"Green",10,39,true)];
      //let currCard = new TrainCard("blue");
      //this.players[0].drawTrainCard(currCard);
      //let dCard = new DestinationCard("alabama", "provo", 8)
      //this.players[0].drawDestinationCard([dCard]);
      this.whoseTurn = 0;
      this.map = new GameMap();
      this.numDestinationCardsRemaining = 30;
      this.numTrainCardsRemaining = 110;
      this.faceUpCards = new FaceUpCards([new TrainCard("blue"), new TrainCard("blue"), new TrainCard("pink"), new TrainCard("brown"), new TrainCard("yellow")]);
      this.chatRoom = new ChatRoom("thisGame", [new ChatMessage("BEN", "Hello, World!", new Date())]);
      this.potentialDestinationCards = [new DestinationCard("Salt Lake", "Miami", 15), new DestinationCard("Boston", "Chicago", 10), new DestinationCard("Sacramento", "Mesa", 5)];
      this.winner = null;
  }

    setGameID(input: string): void{
      this.gameID = input;
    }

    getGameID(): string{
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
      console.log("PLAYER");
      console.log(this.players);
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
     /* this.gameID = "EPICGAME";
      this.players = [new Player("Ben"),new Player("lincoln")]//.initiateGame(new PlayerHand(),40,"Green",10,39,true)];
      this.players[0].initiateGame(new PlayerHand(),40,"Green",10,39,true);
      this.players[1].initiateGame(new PlayerHand(),40,"Green",15,3,true);
      this.whoseTurn = 1;
      this.map = new GameMap();
      //this.numDestinationCardsRemaining = 30;
     // this.numTrainCardsRemaining = 110;
     // this.faceUpCards = new FaceUpCards([new TrainCard("blue"), new TrainCard("blue"), new TrainCard("pink"), new TrainCard("brown"), new TrainCard("yellow")]);
      this.chatRoom = new ChatRoom("thisGame", [new ChatMessage("BEN", "Hello, World!", new Date())]);
      this.potentialDestinationCards = [new DestinationCard("Salt Lake", "Miami", 15), new DestinationCard("Boston", "Chicago", 10), new DestinationCard("Sacramento", "Mesa", 5)];*/
      return this.faceUpCards;
  }

  drawTrainCard():TrainCard {

    let trainCards = [new TrainCard("blue"), new TrainCard("pink"), new TrainCard("yellow"), new TrainCard("white"), new TrainCard("black")];
    let drawnCard = trainCards[this.randomInt(0, 4)];
    this.faceUpCards.drawCard(this.randomInt(0, 4), drawnCard);
    this.numTrainCardsRemaining -= 1;
   //this.numTrainCardsRemaining -= 1;
    this.addTrainCard('ben', drawnCard);
    return drawnCard;
  }


  randomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    console.log("WHY ARE MY PLAYERS EMPTY");
    console.log(this.players);     
        this.players.forEach((player) => {
            if (player.getUsername() == username) {
              player.drawTrainCard(trainCard);
              this.numTrainCardsRemaining -= 1;
              //player.setNumTrainCards(player.getNumTrainCards() - 1);
              return;
            }
        });
      //this.nextTurn();
    }

  addDestinationCard(username: string, destinationCards: Array<DestinationCard>) {
    //this.numDestinationCardsRemaining -= destinationCards.length;
    console.log("DSFSDOFDIOSFIOSDFOIDSFOISDOIFDS");
    this.players.forEach((thisPlayer) => {
      if (thisPlayer.getUsername() == username) {
        thisPlayer.drawDestinationCard(destinationCards);
          return;
        }
       });
    //this.nextTurn();
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
                player.setNumTrains(numUsed)
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
        player.setNumTrainCards(numCards);
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
    console.log("WHOOP WHOOP");
    return this.potentialDestinationCards;
  }

  discardDestinationCard(){
    this.potentialDestinationCards.length = 0;
  }

  changeTurn(username: string): void {
    let index = 0;
    this.players.forEach((player) => {
        if (player.getUsername() == username) {
            this.whoseTurn = index;
            player.setTurn(true);
        } else {
            player.setTurn(false);
        }
        index++;
    });
  }
  /*nextTurn(): void {
    this.players[this.whoseTurn].myTurn = false;
    console.log(this.players[this.whoseTurn].username + " false");
    this.whoseTurn = (this.whoseTurn + 1) % this.players.length;
    this.players[this.whoseTurn].myTurn = true;
      console.log(this.players[this.whoseTurn].username + " true");
  }*/
  setWinner(username: string): void {
    this.winner = username;
  }
  getWinner(): string {
    return this.winner;
  }
  getWinnerPlayer(): Player {
    let winnerPlayer = null;
    this.players.forEach((player) => {
     // console.log(player.getUsername());
      if (player.getUsername() == this.winner) {
        //console.log(player);
        winnerPlayer = player;
        }
    });
    return winnerPlayer;
  }

  updateScores(scores: number[]): void {
    let index = 0;
    this.players.forEach((player) => {
        player.setScore(scores[index]);
        index++;
    });
  }
  
  getLocalPlayer(username: string): Player{
    let localPlayer = null;
    this.players.forEach((player) => {
     // console.log(player.getUsername());
      if (player.getUsername() == username) {
        //console.log(player);
        localPlayer = player;
        }
    });
    return localPlayer;
  }
  getPlayerWithMostRoutes(): Player {
    let mrPlayer = null;
    let mr = 0;
    this.players.forEach((player) => {
     let ownedRoutes = player.getOwnedRoutes().length;
      if (ownedRoutes >= mr) {
        mrPlayer = player;
        mr = ownedRoutes
      }
    });
    return mrPlayer;
  }
}
