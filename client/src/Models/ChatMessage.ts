export class ChatMessage {
    playerName: String;
    message: String;
    timeStamp: Date;

    constructor(playerName: String, message: String, timeStamp: Date) {
        this.playerName = playerName;
        this.message = message;
        this.timeStamp = timeStamp;
    }

    getPlayerName(): String {
        return this.playerName;
    }

    getMessage(): String {
        return this.message;
    }

    getTimeStamp(): Date {
        return this.timeStamp;
    }
}