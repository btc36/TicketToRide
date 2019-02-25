package model;

import java.util.Date;

public class ChatMessage {
    String plyaerName;
    String message;
    Date timeStamp;

    public ChatMessage()
    {

    }
    public ChatMessage(String playerName, String message, Date timeStamp)
    {
        this.plyaerName = playerName;
        this.message = message;
        this.timeStamp = timeStamp;
    }


    public String getPlyaerName() {
        return plyaerName;
    }

    public void setPlyaerName(String plyaerName) {
        this.plyaerName = plyaerName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }
}
