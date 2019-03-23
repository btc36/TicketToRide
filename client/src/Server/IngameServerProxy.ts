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

    claimRoute(route: Route, username: String, gameId: String) {
        console.log(route);
        console.log(username);
        console.log(gameId);
    }

    DrawDestinationCard(gameId:String, username:String) {
        const command = new ClientCommandObjects(this.gameClass, "drawDestinatGameFacadeionCard", [this.paramTypeString, this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    }

    SendChat(message: String, time: String, username:String, gameId: String) {
        const command = new ClientCommandObjects(this.serverClass, "sendChat", [this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString], [message,time,username,gameId]);
        this.communicator.sendCommand(command);
    }

  public getChatHistory(gameId: String){
    const command = new ClientCommandObjects(this.serverClass, "getChatHistory", [this.paramTypeString], [gameId]);
    this.communicator.sendCommand(command);
  }

  drawTrainCard(gameID: string, player: string, index: number) {
    const command = new ClientCommandObjects(this.serverClass, "drawTrainCard", [this.paramTypeString, this.paramTypeString, this.paramTypeInteger], [gameID, player, index]);
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
        // const card = destinationCards[0];
        if(destinationCards.length > 0)
        {
            const card = destinationCards[0];
            city1 = card.city1.valueOf();
            city2 = card.city2.valueOf();
            pointValue = card.getPointValue();
        }

        const command = new ClientCommandObjects(this.gameClass, "discardDestinationCard", [this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeString, this.paramTypeInteger], [gameId, username, city1, city2, pointValue]);
        this.communicator.sendCommand(command);
    }

    /**
     *
     * @param gameId
     * @param username
     * @return retrieves upto three cards from the server
     */
    PotentialDestinationCard(gameId:String, username:String)
    {
        const command = new ClientCommandObjects(this.gameClass, "potentialDestinationCard", [this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    }
}
