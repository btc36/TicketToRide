package model;

public class HistoryEntry {
    private String username;
    private String move;

    public HistoryEntry() { }

    public HistoryEntry(String username, String move)
    {
        this.username = username;
        this.move = move;
    }
}
