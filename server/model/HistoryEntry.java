package model;

import java.io.Serializable;

public class HistoryEntry implements Serializable {
    private String username;
    private String move;

    public HistoryEntry() { }

    public HistoryEntry(String username, String move)
    {
        this.username = username;
        this.move = move;
    }
}
