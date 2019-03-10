package model;

import java.util.ArrayList;
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
    private FaceUpCards faceUpCards;

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
        faceUpCards = null;
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
        faceUpCards = new FaceUpCards();
        setUpDestinationCards();
        setUpTrainCards();
        setUpFaceUpCards();
        giveTrainCards();
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

    /**
     * Sets up 30 Destination Cards
     */
    public void setUpDestinationCards()
    {
        destDeck.add(new DestinationCard("Atlanta", "Santa Fe", 8));

        destDeck.add(new DestinationCard("Charleston", "El Paso", 10));
        destDeck.add(new DestinationCard("Charleston", "New York", 9));

        destDeck.add(new DestinationCard("Denver", "Nashville", 7));
        destDeck.add(new DestinationCard("Duluth", "Charleston", 6));
        destDeck.add(new DestinationCard("Duluth", "Miami", 9));

        destDeck.add(new DestinationCard("El Paso", "Charleston", 8));
        destDeck.add(new DestinationCard("El Paso", "Salt Lake City", 7));

        destDeck.add(new DestinationCard("Helena", "Little Rock", 7));
        destDeck.add(new DestinationCard("Helena", "Nashville", 9));
        destDeck.add(new DestinationCard("Houston", "Phoenix", 11));
        destDeck.add(new DestinationCard("Houston", "Raleigh", 8));

        destDeck.add(new DestinationCard("Kansas City", "Dallas", 14));

        destDeck.add(new DestinationCard("Las Vegas", "Denver", 4));
        destDeck.add(new DestinationCard("Los Angeles", "Duluth", 10));
        destDeck.add(new DestinationCard("Los Angeles", "Miami", 13));
        destDeck.add(new DestinationCard("Los Angeles", "New York", 13));

        destDeck.add(new DestinationCard("Miami", "Atlanta", 5));
        destDeck.add(new DestinationCard("Miami", "Salt Lake City", 8));

        destDeck.add(new DestinationCard("Omaha", "Miami", 6));

        destDeck.add(new DestinationCard("Phoenix", "Helena", 5));
        destDeck.add(new DestinationCard("Phoenix", "Washington DC", 10));
        destDeck.add(new DestinationCard("Pittsburgh", "Santa Fe", 7));
        destDeck.add(new DestinationCard("Portland", "New Orleans", 8));

        destDeck.add(new DestinationCard("Saint Louis", "Atlanta", 9));
        destDeck.add(new DestinationCard("Saint Louis", "Boston", 11));
        destDeck.add(new DestinationCard("Salt Lake City", "Pittsburgh", 7));
        destDeck.add(new DestinationCard("Salt Lake City", "Raleigh", 10));
        destDeck.add(new DestinationCard("Santa Fe", "Charleston", 9));

        destDeck.add(new DestinationCard("Washington DC", "Helena", 14));

        destDeck.shuffle();
    }

    /**
     * Sets up 110 Train Cards
     */
    public void setUpTrainCards()
    {
        for(int i = 0; i < 12; i++)
        {
            trainDeck.add(new TrainCard("pink"));
            trainDeck.add(new TrainCard("white"));
            trainDeck.add(new TrainCard("blue"));
            trainDeck.add(new TrainCard("yellow"));
            trainDeck.add(new TrainCard("orange"));
            trainDeck.add(new TrainCard("black"));
            trainDeck.add(new TrainCard("red"));
            trainDeck.add(new TrainCard("green"));
            trainDeck.add(new TrainCard("rainbow"));
        }
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.add(new TrainCard("rainbow"));
        trainDeck.shuffle();
    }

    private void setUpFaceUpCards()
    {
        //List<TrainCard> list = new ArrayList<>();
        for(Object o : this.trainDeck.getFive())
        {
            faceUpCards.addFaceUpCard((TrainCard) o);
        }

        if(faceUpCards.isThreeOrMoreWild())
        {
            for(TrainCard card : faceUpCards.getFaceUpCards())
            {
                trainDeck.add(card);
            }
            faceUpCards.clear();

            setUpFaceUpCards();
        }
        else
        {
            return;
        }
    }

    private void giveTrainCards()
    {
        for(PlayerModel p : playerList.getPlayerList())
        {
            assert(trainDeck.getSize() >= 4);
            p.addTrainCards(trainDeck.getThisMany(4));
        }
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
