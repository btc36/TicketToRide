package model;

import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;

public class ChatRoom
{
    private List<ChatMessage> messages;
    private String gameID;

    public ChatRoom()
    {
        messages = new ArrayList<>();
    }
    public ChatRoom(String gameID)
    {
        this.gameID = gameID;
        messages = new ArrayList<>();
    }

    public void addChat(ChatMessage message)
    {
        messages.add(message);
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }
    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }

    public String getGameID() {
        return gameID;
    }
    public void setGameID(String gameID) {
        this.gameID = gameID;
    }
}
