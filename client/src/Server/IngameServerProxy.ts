import { ClientCommunicator } from "./ClientCommunicator";
import { DestinationCard } from "../Models/DestinationCard";
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

    DrawDestinationCard(gameId:String) {
        const command = new ClientCommandObjects(this.gameClass, "drawDestinatGameFacadeionCard", [this.paramTypeString], [gameId]);
        this.communicator.sendCommand(command);
    }

    SendChat(message: String, time: Date,username:String, gameId: String) {
        const command = new ClientCommandObjects(this.serverClass, "sendChat", [this.paramTypeString, this.paramTypeDate, this.paramTypeString, this.paramTypeString], [message,time,username,gameId]);
        this.communicator.sendCommand(command);
    }

    DiscardDestinationCard(gameId:String,destinationCards: Array<DestinationCard>) {
        const command = new ClientCommandObjects(this.gameClass, "discardDestinationCardCommand", [this.paramTypeString, this.paramTypeList], [gameId,destinationCards]);
        this.communicator.sendCommand(command);
    }
}