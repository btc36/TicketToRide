package model;

import command.GenericCommand;

import java.util.ArrayList;
import java.util.List;

public class ChatRoom
{
    List<ChatMessage> messages;
    String gameID;

    public ChatRoom()
    {
        messages = new ArrayList<>();
    }
    public ChatRoom(String gameID)
    {
        this.gameID = gameID;
        messages = new ArrayList<>();
    }

    public void getChatHistory()
    {

    }
    public void addChat(ChatMessage message)
    {
        messages.add(message);
    }


}
