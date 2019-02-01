package model;

import java.util.ArrayList;
import java.util.UUID;

public class LobbyGameModel
{
    enum State
    {
        WAITING, ONGOING, FINISHED;
    }
    private String gameID;
    private PlayerListModel playerList;
    private int maxPlayer;
    private int currentPlayerNum;
    private PlayerModel host;
    private State state;

    public LobbyGameModel()
    {

    }
    public LobbyGameModel(PlayerModel host)
    {
        gameID = UUID.randomUUID().toString();
        playerList = new PlayerListModel();
        maxPlayer = 5;
        currentPlayerNum = 0;
        state = State.WAITING;
        this.host = host;
    }
    public void addPlayer(PlayerModel player)
    {
        playerList.addPlayer(player);
    }
    public void removePlayer(PlayerModel player)
    {
        playerList.removePlayer(player);
    }

    public String getGameID()
    {
        return gameID;
    }

    public void setGameID(String gameID)
    {
        this.gameID = gameID;
    }

    public PlayerListModel getPlayerList()
    {
        return playerList;
    }

    public void setPlayerList(PlayerListModel playerList)
    {
        this.playerList = playerList;
    }

    public int getMaxPlayer()
    {
        return maxPlayer;
    }

    public void setMaxPlayer(int maxPlayer)
    {
        this.maxPlayer = maxPlayer;
    }

    public PlayerModel getHost()
    {
        return host;
    }

    public void setHost(PlayerModel host)
    {
        this.host = host;
    }
    public State getState()
    {
        return state;
    }
    public void setState(State state)
    {
        this.state = state;
    }
    public void endGame()
    {
        this.state = State.FINISHED;
    }
    public void startGame()
    {
        this.state = State.ONGOING;
    }

    public int getCurrentPlayerNum()
    {
        currentPlayerNum = playerList.getPlayerList().size();
        return currentPlayerNum;
    }

    public void setCurrentPlayerNum(int currentPlayerNum) {
        this.currentPlayerNum = currentPlayerNum;
    }
}
