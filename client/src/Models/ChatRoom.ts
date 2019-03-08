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

    setChatHistory(chats: Array<ChatMessage>) {
        this.chatHistory = chats;
    }
}