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
    private String gamename;
    private model.PlayerListModel playerList;
    private int maxPlayer;
    private int currentPlayerNum;
    private model.PlayerModel host;
    private State state;

    public LobbyGameModel()
    {

    }
    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename)
    {
        playerList = new PlayerListModel();
        gameID = gamename;
        //gameID = UUID.randomUUID().toString().substring(0,4);
        currentPlayerNum = 1;
        this.maxPlayer = maxPlayer;
        this.host = host;
        this.gamename = gamename;
        playerList.addPlayer(this.host);
        state = State.WAITING;
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

    public String getGamename() {
        return gamename;
    }

    public void setGamename(String gamename) {
        this.gamename = gamename;
    }

    public int getCurrentPlayerNum()
    {
        currentPlayerNum = playerList.getPlayerList().size();
        return currentPlayerNum;
    }

    public void setCurrentPlayerNum(int currentPlayerNum) {
        this.currentPlayerNum = currentPlayerNum;
    }

    @Override
    public int hashCode()
    {
        return gameID.hashCode();
    }

    @Override
    public boolean equals(Object o)
    {
        if(o == null) return false;
        if(o instanceof PlayerModel)
        {
            LobbyGameModel object  = (LobbyGameModel) o;
            return(this.gameID.equals(object.gameID));
        }
        else
        {
            return false;
        }
    }
}
