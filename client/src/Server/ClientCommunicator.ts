import { ClientCommandObjects } from "./ClientCommandObjects";
import { Serializer } from "./Serializer";
import { ExternalClientFacade } from "../Services/ExternalClientFacade";
import { GameList } from "../Models/GameList";
import { Player } from "../Models/Player";
import { LobbyGame } from "../Models/LobbyGame";
import { IngameExternalClientFacade } from "../Services/IngameExternalClientFacade";
import {TrainCard} from "../Models/TrainCard";
import {FaceUpCards} from "../Models/FaceUpCards";
import { PlayerHand } from "../Models/PlayerHand";
import { Route } from "../Models/Route";
import { DestinationCard } from "../Models/DestinationCard";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export class ClientCommunicator {
  serverUrl: string;
  serverPort: string;
  serializer: Serializer;
  clientFacade: ExternalClientFacade;
  inGameClientFacade: IngameExternalClientFacade;

  constructor(public serverUrlIn: string, public serverPortIn: string, public serialIn: Serializer, public facadeIn: ExternalClientFacade, public inGameECFIn: IngameExternalClientFacade) {
    this.serverUrl = serverUrlIn;
    this.serverPort = serverPortIn;
    this.serializer = serialIn;
    this.clientFacade = facadeIn;
    this.inGameClientFacade = inGameECFIn;
  }
  public sendCommand(command: ClientCommandObjects) {
    let method = command._methodName;
    let isTrainCardCommand = null;
    if (method == "drawTrainCard") {
      isTrainCardCommand = true;
    }
    var data = this.serializer.toJSON(command);
    var request = new XMLHttpRequest();
    request.open('POST', "/command", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let that = this;
    let serial = this.serializer;
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var result = serial.parseJSON(request.responseText);
        if (isTrainCardCommand) {
          console.log("success!!!!");
          console.log(result);
        }
        that.executeCommands(result);
      } else {
        // We reached our target server, but it returned an error
        console.log("ERRROROROROROROROROROR");
        var result = serial.parseJSON(request.responseText);
        console.log(result);
      }

      //console.log("dragon");
      //console.log(data);
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send(data);
  }

  // Execute the command received from the server
  public executeCommands(commands: ClientCommandObjects[]) {
    for (var i = 0; i < commands.length; i++){
      this.executeCommmandHelper(commands[i])
    }
  }

  private executeCommmandHelper(cmd: ClientCommandObjects) {
      /*if (cmd._methodName == "drawTrainCard") { // THIS WAS NOT THE FUNCTION, JUST AN IF STATEMENT TO LOG THE COMMAND
    console.log("YOUR WISH IS MY COMMAND");
    console.log(commands);
    let params = cmd._paramValues;
    if(params[0])
    {
      let cardList = new Array<TrainCard>();
      let card = new TrainCard(params[4].color);//params[4]; // or new TrainCard(params[4].color);
      let faceUpCards = new FaceUpCards(params[5]); // will JSON be parsed correctly?
      cardList.push(card);
      let username = params[3];
      this.inGameClientFacade.storeTrainCards(username, cardList);
      this.inGameClientFacade.setFaceUpCards(faceUpCards);
    }
    }*/
    if (cmd._methodName == "currentTurn") {
      //console.log("CURRENT TURN COMMAND EXECUTED");
      this.inGameClientFacade.currentTurn(cmd._paramValues[3]);
    }

    else if (cmd._methodName == "claimRoute") {
      console.log("ClaimRoute command recieved");
      //{"_className":"IngameExternalClientFacade","_methodName":"claimRoute","_paramTypes":["java.lang.Boolean","java.lang.String"],"_paramValues":[false,"error : m : claimRoute insufficient resource\n"],"typeSize":2,"valueSize":2}
      if(cmd._paramValues[0] == false) {
        this.inGameClientFacade.claimRoute(false, cmd._paramValues[1]);
      }
      else {
        //cmd._paramValues[4]
        const city1 = cmd._paramValues[4].cityOne;
        const city2 = cmd._paramValues[4].cityTwo;
        const length = cmd._paramValues[4].length;
        const color = cmd._paramValues[4].color;
        const route = new Route(city1, city2, length, color);
        this.inGameClientFacade.claimRoute(true, cmd._paramValues[1], cmd._paramValues[2], cmd._paramValues[3], route);
      }
    }

    else if (cmd._methodName == "loginStatus") {
      this.clientFacade.loginResults(cmd._paramValues[0], cmd._paramValues[1]);
    }
    else if (cmd._methodName == "registerStatus") {
      this.clientFacade.registerResults(cmd._paramValues[0], cmd._paramValues[1]);
    }
    else if (cmd._methodName == "updateGameList") {
      const games = cmd._paramValues[2];
      const gameList = new GameList();
      for (let i = 0; i < games.length; i++) {
        const gameID = games[i].gameID;
        const name = games[i].gamename;
        const host = new Player(games[i].host);
        const maxPlayers = games[i].maxPlayer;
        const game = new LobbyGame(gameID, host, name, maxPlayers);

        const players = games[i].playerList.playerList;
        for (let j = 0; j < players.length; j++) {
          const player = new Player(players[j].username);
          game.addPlayer(player);
        }
        gameList.addGame(game);
      }
      this.clientFacade.updateGameList(cmd._paramValues[0], gameList, cmd._paramValues[1]);
    }
    else if (cmd._methodName == "joinGame") {
      this.clientFacade.joinGame(cmd._paramValues[2]);
    }
    else if (cmd._methodName == "drawTrainCard") {
      if (cmd._paramValues[0]) { // success
        console.log("THE SERVER RESPONDED!!!! YAY!");
        console.log(cmd);
        let faceUpArray = new Array<TrainCard>();
        //faceup
        for (let j = 0; j < cmd._paramValues[5].length; j++) {
          const card = new TrainCard(cmd._paramValues[5][j].color);
          faceUpArray.push(card);
        }
        let faceUp = new FaceUpCards(faceUpArray);
        let drawnCards = new Array<TrainCard>();
        //drawncard
         const card = new TrainCard(cmd._paramValues[4].color); // server now returns one card
        drawnCards.push(card);
       // for (let k = 0; k < cmd._paramValues[4].length; k++) {
        //  const card = new TrainCard(cmd._paramValues[4][k].color);
         // drawnCards.push(card);
        //}
        this.inGameClientFacade.drawTrainCard(cmd._paramValues[0], cmd._paramValues[1], cmd._paramValues[2], cmd._paramValues[3], drawnCards, faceUp);
      }
    }
    else if (cmd._methodName == "startGame") {
      console.log("IM HERE IM HERE IM HERE");
      const game = cmd._paramValues[3][0]; // JSON game
      const players = game.playerList.playerList; // JSON players
      console.log("MY GAME IS:");
      console.log(game);
      console.log("MY PLAYERS ARE");
      console.log(players);
      let gamePlayers = new Array<Player>();
      this.inGameClientFacade.setGame(game);
      // Players from lobby are in game: 6 percent
      this.inGameClientFacade.setGameId(game.gameID);
      let startingPlayer = null;
      for (let i = 0; i < players.length; i++)
      {
        const player = new Player(players[i].username);
        if (players[i].turn) {
          startingPlayer = players[i].username;
        }
        player.setTurn(players[i].turn);
        player.color = players[i].color;
        player.score = 0;
        const hand = new PlayerHand();

        // let dests = Array<DestinationCard>();
        // for (let i = 0; i < players.length; i++) {
        //   const player = new Player(players[i].username);
        //   player.setTurn(players[i].turn);
        //   player.color = players[i].color;
        //   player.score = 0;
          //const hand = new PlayerHand();

          let dests = Array<DestinationCard>();

          for (let j = 0; j < players[i].destinationCards.length; j++) {
            const city1 = players[i].destinationCards[j].city1;
            const city2 = players[i].destinationCards[j].city2;
            const pointValue = players[i].destinationCards[j].pointValue;
            dests.push(new DestinationCard(city1, city2, pointValue));
          }
          //hand.addDestinationCard(dests);
          console.log("PASSING STUFF");
          this.inGameClientFacade.presentDestinationCard(true, "NONE", dests);
          let trains = Array<TrainCard>();
          for (let j = 0; j < players[i].trainCards.length; j++) {
            hand.addTrainCard(new TrainCard(players[i].trainCards[j].color));
          }
          player.myHand = hand;
          gamePlayers.push(player);
          if (players[i].username == this.clientFacade.getCurrentUser()) {
              this.inGameClientFacade.setLocalPlayer(player);
            }
          }
        this.inGameClientFacade.setPlayerList(gamePlayers);
        this.inGameClientFacade.setNumDestinationCardsRemaining(30);
        //this.inGameClientFacade.setNumDestinationCardsRemaining(game.destDeck.size)
        this.inGameClientFacade.setNumTrainCardsRemaining(game.trainDeck.size)
        // Face-up Deck is initialized by random cards from the server: 7 percent
        //first "faceUpCards" is name of the object and the second "faceUpCards" is name of List in that object

        const faceUps = game.faceUpCards.faceUpCards;
        let faceUpArray = new Array<TrainCard>();
        for (let j = 0; j < faceUps.length; j++) {
          const card = new TrainCard(faceUps[j].color);
          faceUpArray.push(card);
        }

      let faceUp = new FaceUpCards(faceUpArray);
      console.log("FACE UP CARDS OBJECT");
      console.log(faceUp);
        this.inGameClientFacade.setFaceUpCards(faceUp); // 5 face up cards  Solution 1
        //this.inGameClientFacade.setDest

        // // Each player has 4 random (top of a shuffled deck) train cards from server: 7 percent
        // for (let i = 0; i < players.length; i++) // pass out 4 cards to everyone in the client (already done in the server)
        // {
        //   this.inGameClientFacade.storeTrainCards(players[i].username, players[i].trainCards)
        // }
      this.clientFacade.startGame(cmd._paramValues[2]);
     // this.inGameClientFacade.changeTurn(startingPlayer);
      }
    //}
    else if (cmd._methodName == "receiveChatCommand") {
      this.inGameClientFacade.receiveChatCommand(cmd._paramValues[0], cmd._paramValues[1], cmd._paramValues[2], cmd._paramValues[3]);
    }
    else if (cmd._methodName == "potentialDestinationCard") {
      this.inGameClientFacade.presentDestinationCard(cmd._paramValues[0], cmd._paramValues[1], cmd._paramValues[4]);
    }
    else if (cmd._methodName == "discardDestinationCard") {
      this.inGameClientFacade.discardDestinationCard(cmd._paramValues[0], cmd._paramValues[1], cmd._paramValues[4]);
    }
    else if (cmd._methodName == "drawDestinationCard") {
      this.inGameClientFacade.addDestinationCard(cmd._paramValues[0], cmd._paramValues[1], cmd._paramValues[3], cmd._paramValues[4]);
    }
    else if (cmd._methodName == "updateNumDestinationCards") {
      this.inGameClientFacade.updateNumberOfDestinationCards(cmd._paramValues[3], cmd._paramValues[5]);
    }
    else if (cmd._methodName == "updateScore") {

      let players = cmd._paramValues[4];
      for (let i = 0; i < players.length; i++)
      {
        this.inGameClientFacade.updateNumDestinationCards(players[i].username, players[i].destCardNum);

        //train carDs NOT TRAIN CARS
        this.inGameClientFacade.updateNumTrainCardsInHand(players[i].username, players[i].trainCardNum);

        //train cars NOT CARDS
        this.inGameClientFacade.updateNumTrainCars(players[i].username, players[i].trainNum);
      }

      const faceUps = cmd._paramValues[5];

      let faceUpArray = new Array<TrainCard>();
      for (let j = 0; j < faceUps.length; j++) {
        const card = new TrainCard(faceUps[j].color);
        faceUpArray.push(card);
      }
      let faceUp = new FaceUpCards(faceUpArray);
      this.inGameClientFacade.setFaceUpCards(faceUp);

      this.inGameClientFacade.updateScores(cmd._paramValues[3]);
      //console.log("MY PLAYER INFO TO UPDATE SCORES");
      //console.log(cmd);

    }
    else if (cmd._methodName == "endGame") {
      this.inGameClientFacade.endGame(cmd._paramValues[2]);
    }
  }
}
