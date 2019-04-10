package model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class GameHistory implements Serializable {

    private List<HistoryEntry> gameHistory;
    private String gameID;

    public GameHistory()
    {
        gameHistory = new ArrayList<>();
    }

    public GameHistory(String gameID)
    {
        gameHistory = new ArrayList<>();
    }

    public void addHistory(String username, String move)
    {
        gameHistory.add(new HistoryEntry(username, move));
    }

    public void addHistory(HistoryEntry entry)
    {
        gameHistory.add(entry);
    }

    public List<HistoryEntry> getGameHistory() {
        return gameHistory;
    }

    public void setGameHistory(List<HistoryEntry> gameHistory) {
        this.gameHistory = gameHistory;
    }

    public String getGameID() {
        return gameID;
    }

    public void setGameID(String gameID) {
        this.gameID = gameID;
    }

}
