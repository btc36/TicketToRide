package model;

import java.util.Date;

public class ChatMessage {
    String username;
    String message;
    Date time;

    public ChatMessage()
    {

    }
    public ChatMessage(String message, Date time, String username)
    {
        this.username = username;
        this.message = message;
        this.time = time;
    }

    public String getPlyaerName() { return username; }
    public void setPlyaerName(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimeStamp() {
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
