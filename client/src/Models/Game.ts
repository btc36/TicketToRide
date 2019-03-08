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

    constructor(players: Array<Player>, whoseTurn: number, map: GameMap, numDestinationCardsRemaining: number, numTrainCardsRemaining: number, faceUpCards: FaceUpCards, chatRoom: ChatRoom) {
        this.players = players;
        this.whoseTurn = whoseTurn;
        this.map = map;
        this.numDestinationCardsRemaining = numDestinationCardsRemaining;
        this.numTrainCardsRemaining = numTrainCardsRemaining;
        this.faceUpCards = faceUpCards;
        this.chatRoom = chatRoom;
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
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
                player.claimRoute(route);
                return;
            }
        });
    }

    useTrainCard(player: Player, trainCard: TrainCard,numUsed:number): void {
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
                player.useTrainCard(trainCard,numUsed);
                return;
            }
        });
    }

    addTrainCard(player: Player, trainCard: TrainCard): void {
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
                player.drawTrainCard(trainCard);
                return;
            }
        });
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
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
                player.setScore(points);
                return;
            }
        });
    }


    updateNumTrainCars(player: Player, numUsed: number): void {
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
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

    changeTurn(player: Player): void {
        let username = player.getUsername;
        this.players.forEach((player) => {
            if (player.getUsername == username) {
                player.setTurn(true);
            } else {
                player.setTurn(false);
            }
        });
    }
}