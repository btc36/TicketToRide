package model;

import java.util.List;
import java.util.UUID;

public class LobbyGameModel
{
    public enum State {WAITING, ONGOING, FINISHED;}
    private String gameID;
    private String gamename;
    private PlayerListModel playerList;
    private int maxPlayer;
    private int currentPlayerNum;
    private PlayerModel host;
    private State state;
    private Deck destDeck;
    private Deck trainDeck;

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename, String gameID) {
        //this.LobbyGameModel(host, maxPlayer, gamename);
    }

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename)
    {
        playerList = new PlayerListModel();
        gameID = gamename; // UUID.randomUUID().toString().substring(0,4);
        currentPlayerNum = 1;
        this.maxPlayer = maxPlayer;
        this.host = host;
        this.gamename = gamename;
        playerList.addPlayer(this.host);
        state = State.WAITING;
        destDeck = null;
        trainDeck = null;
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
        destDeck = new Deck();
        trainDeck = new Deck();
        setUpDestinationCard();
    }

    public String getGamename() {
        return gamename;
    }
    public void setGamename(String gamename)
    {
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


    public void addDestCard(DestinationCard card)
    {
        destDeck.add(card);
    }
    public void addTrainCard(TrainCard card)
    {
        trainDeck.add(card);
    }
    public Deck getDestDeck() {
        return destDeck;
    }

    public void setDestDeck(Deck destDeck) {
        this.destDeck = destDeck;
    }

    public Deck getTrainDeck() {
        return trainDeck;
    }

    public void setTrainDeck(Deck trainDeck) {
        this.trainDeck = trainDeck;
    }

    public void setUpDestinationCard()
    {
        destDeck.add(new DestinationCard("s1", "d1", 1));
        destDeck.add(new DestinationCard("s2", "d2", 2));
        destDeck.add(new DestinationCard("s3", "d3", 3));
        destDeck.add(new DestinationCard("s4", "d4", 4));
        destDeck.add(new DestinationCard("s5", "d5", 5));
        destDeck.add(new DestinationCard("s6", "d6", 6));
        destDeck.add(new DestinationCard("s7", "d7", 7));
        destDeck.add(new DestinationCard("s8", "d8", 8));
        destDeck.add(new DestinationCard("s9", "d9", 9));
        destDeck.add(new DestinationCard("s10", "d10", 10));
        destDeck.add(new DestinationCard("s11", "d11", 11));
        destDeck.add(new DestinationCard("s12", "d12", 12));
        destDeck.add(new DestinationCard("s13", "d13", 13));
        destDeck.add(new DestinationCard("s14", "d14", 14));
        destDeck.add(new DestinationCard("s15", "d15", 15));
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
        else { return false; }
    }
}
