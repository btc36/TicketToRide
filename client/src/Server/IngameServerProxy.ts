import { ClientCommunicator } from "./ClientCommunicator";
import { DestinationCard } from "../Models/DestinationCard";

export class IngameServerProxy {
    host: string;
    port: string;
    communicator: ClientCommunicator

    DrawDestinationCard(destinationCards: Array<DestinationCard>) {

    }

    SendChat(message: String, time: Date, gameId: String) {

    }

    DiscardDestinationCard(destinationCards: Array<DestinationCard>) {

    }
}