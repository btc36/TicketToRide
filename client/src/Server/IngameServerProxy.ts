import { ClientCommunicator } from "./ClientCommunicator";
import { DestinationCard } from "../Models/DestinationCard";
import { ClientCommandObjects } from "./ClientCommandObjects";

//This sends commands to the Server
export class IngameServerProxy {
    host: string;
    port: string;
    communicator: ClientCommunicator

    DrawDestinationCard(gameId:String) {
        const command = new ClientCommandObjects("server.GameFacade", "drawDestinatGameFacadeionCard", ["java.lang.String"], [gameId]);
        this.communicator.sendCommand(command);
    }

    SendChat(message: String, time: Date,username:String, gameId: String) {
        const command = new ClientCommandObjects("server.ServerFacade", "sendChat", ["java.lang.String", "java.lang.Date", "java.lang.String", "java.lang.String"], [message,time,username,gameId]);
        this.communicator.sendCommand(command);
    }

    DiscardDestinationCard(gameId:String,destinationCards: Array<DestinationCard>) {
        const command = new ClientCommandObjects("server.GameFacade", "discardDestinationCardCommand", ["java.lang.String", "java.lang.String"], [gameId,destinationCards]);
        this.communicator.sendCommand(command);
    }
}