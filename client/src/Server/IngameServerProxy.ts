import { ClientCommunicator } from "./ClientCommunicator";
import { DestinationCard } from "../Models/DestinationCard";
import { ClientCommandObjects } from "./ClientCommandObjects";

//This sends commands to the Server
export class IngameServerProxy {
    host: string;
    port: string;
    communicator: ClientCommunicator

    DrawDestinationCard(destinationCards: Array<DestinationCard>) {
        const command = new ClientCommandObjects("server.ServerFacade", "DrawDestinationCard", ["java.lang.String", "java.lang.String"], []);
        this.communicator.sendCommand(command);
    }

    SendChat(message: String, time: Date, gameId: String) {
        const command = new ClientCommandObjects("server.ServerFacade", "SendChat", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    }

    DiscardDestinationCard(destinationCards: Array<DestinationCard>) {
        const command = new ClientCommandObjects("server.ServerFacade", "DiscardDestinationCard", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    }
}