package model;

import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatRoom chatRoom = (ChatRoom) o;
        return Objects.equals(gameID, chatRoom.gameID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameID);
    }

    public boolean checkChat(String chatMessage)
    {
        for(ChatMessage m : messages)
            if(m.getMessage().equals(chatMessage))
                return true;
        return false;
    }
}
