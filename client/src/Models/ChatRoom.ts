import { ChatMessage } from "./ChatMessage";

export class ChatRoom {
    gameID: string;
    chatHistory: Array<ChatMessage>;

    constructor(gameID: string, chatHistory: Array<ChatMessage>) {
        this.gameID = gameID;
        this.chatHistory = chatHistory;
    }

    getChatHistory() {
        return this.chatHistory;
    }

    addChat(chat: ChatMessage) {
        this.chatHistory.push(chat);
    }
}