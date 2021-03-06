import { ClientCommunicator } from "./ClientCommunicator";
import { DestinationCard } from "../Models/DestinationCard";
import { Route } from "../Models/Route";
import { ClientCommandObjects } from "./ClientCommandObjects";

//This sends commands to the Server
export class IngameServerProxy {
    host: string;
    port: string;
    serverClass : string = "server.ServerFacade";
    gameClass : string = "server.GameFacade";
    paramTypeString : string = "java.lang.String";
    paramTypeInteger : string = "java.lang.Integer";
    paramTypeDouble : string = "java.lang.Double";
    paramTypeList : string = "java.util.List";
    paramTypeDate : string = "java.util.Date";

    communicator: ClientCommunicator

    constructor(public commIn: ClientCommunicator) {
        this.communicator = commIn;
    }

    getAllServerRoutes(gameId: string) {
        const command = new ClientCommandObjects(this.gameClass, "getRoutes",
          [this.paramTypeString], [gameId]);
        this.communicator.sendCommand(command);
    }

    claimRoute(route: Route, username: String, gameId: String, preferredColor: String) {
        let cities = route.getCities();
        const command = new ClientCommandObjects(this.gameClass, "claimRoute", 
          [this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeInteger, this.paramTypeString],
          [gameId, username, cities[0], cities[1], route.getColor(), route.getLength(), preferredColor])
        this.communicator.sendCommand(command);
    }

    DrawDestinationCard(gameId:String, username:String) {
        const command = new ClientCommandObjects(this.gameClass, "drawDestinationCard", [this.paramTypeString, this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    }

    SendChat(message: String, time: String, username:String, gameId: String) {
        const command = new ClientCommandObjects(this.serverClass, "sendChat", [this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString], [message,time,username,gameId]);
        this.communicator.sendCommand(command);
  }

  endTurn(gameID: string, username: string) {
    const command = new ClientCommandObjects(this.gameClass, "endTurn", [this.paramTypeString, this.paramTypeString], [gameID, username]);
    this.communicator.sendCommand(command);
  }

  whoseTurn(gameID: string) {
    const command = new ClientCommandObjects(this.gameClass, "whoseTurn", [this.paramTypeString], [gameID]);
    this.communicator.sendCommand(command);
  }

  public getChatHistory(gameId: String){
    const command = new ClientCommandObjects(this.serverClass, "getChatHistory", [this.paramTypeString], [gameId]);
    this.communicator.sendCommand(command);
  }

  drawTrainCard(gameID: string, player: string, index: number) {
    console.log("SENDING TRAIN COMMAND");
    console.log(gameID);
    console.log(player);
    console.log(index);
    const command = new ClientCommandObjects(this.gameClass, "drawTrainCard", [this.paramTypeString, this.paramTypeString, this.paramTypeInteger], [gameID, player, index]);
    this.communicator.sendCommand(command);
  }

    /**
     *
     * @param gameId
     * @param username
     * @param destinationCards
     * @return gameID, username,
     */
  DiscardDestinationCard(gameId: String, username: String, destinationCards: Array<DestinationCard>) {
    // console.log(destinationCards);
    // return;
        console.log("Inproxy discard");
        let city1 = "";
        let city2 = "";
        let pointValue = -1;
        let pointValue2 = -1
        let city12 = "";
        let city22 = "";
          for (var i = 0; i < destinationCards.length; i++) {
            const card = destinationCards[i];
            if (i == 0) {
              city1 = card.city1.valueOf();
              city2 = card.city2.valueOf();
              pointValue = card.getPointValue();
            } else {
              city12 = card.city1.valueOf();
              city22 = card.city2.valueOf();
              pointValue2 = card.getPointValue();
            }
            
            
         }
    const command = new ClientCommandObjects(this.gameClass, "discardDestinationCard", [this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeInteger, this.paramTypeString, this.paramTypeString, this.paramTypeInteger], [gameId, username, city1, city2, pointValue, city12, city22, pointValue2 ]);
      this.communicator.sendCommand(command);
    }

    /**
     *
     * @param gameId
     * @param username
     * @return retrieves upto three cards from the server
     */PotentialDestinationCard(gameId:String, username:String)
    PotentialDestinationCard(gameId:String, username:String)
    {
        const command = new ClientCommandObjects(this.gameClass, "potentialDestinationCard", [this.paramTypeString,this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    }
}
