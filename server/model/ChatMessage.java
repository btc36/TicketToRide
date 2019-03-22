package model;

import java.util.Date;

public class ChatMessage {
    String username;
    String message;
    String time;

    public ChatMessage(String message, String time, String username)
    {
        this.username = username;
        this.message = message;
        this.time = time;
    }

    public String getPlayerName() { return username; }
    
    public void setPlayerName(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public String getTimeStamp() {
        return time;
    }
    public void setTimeStamp(Date timeStamp) {
        this.time = time;
    }

    public String toString()
    {
        return "Username: " + username
        + "\nMessage: " + message
        + "\nDate: " + time;
    }
}
