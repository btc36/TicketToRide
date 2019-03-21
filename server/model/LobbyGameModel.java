package model;

import java.util.*;

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
    private List<Route> unClaimedRoutes;
    private List<Route> claimedRoutes;
    private List<City> allCities;
    private String turn;
    private int turnIndex;

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename, String gameID) {
        //this.LobbyGameModel(host, maxPlayer, gamename);
    }

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename)
    {
        playerList = new PlayerListModel();
        //TODO: UNCOMMENT AFTER DONE WITH TESTING
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
        //do calculations here
        this.state = State.FINISHED;
    }
    public void startGame()
    {
        this.state = State.ONGOING;
        initalize();
    }

    public void setUpPlayers()
    {
        for(PlayerModel p : playerList.getPlayerList())
        {
            p.startGame();
        }
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


    public void claimRoute(Route route, String username)
    {
        unClaimedRoutes.remove(route); // for sale
        route.setClaimedBy(username); // mark the territory
        claimedRoutes.add(route); // sold list
        PlayerModel luckyGuy = getPlayer(username);
        assert (luckyGuy != null);
        luckyGuy.claimRoute(route);
        checkDestinationCard(luckyGuy);
    }

    public boolean isClaimed(Route route) { return claimedRoutes.contains(route); }

    private void checkDestinationCard(PlayerModel player)
    {
        List<DestinationCard> destinationCards = player.getDestinationCards();
        //check for route
        for(DestinationCard card : destinationCards)
        {
            Set<City> visited = new HashSet<>(); // prevents visiting same city
            City src = getCityByName(card.getCity1());
            City dst = getCityByName(card.getCity2());

            if(destinationTraverse(src, dst, visited)) // if found complete the card
                player.completeDestinaton(card);
        }
    }
    private boolean destinationTraverse(City src, City dst, Set<City> visited)
    {
        List<City> neighbors = src.getNeighbors();
        if(neighbors.contains(dst)) return true;

        for(City c : src.getNeighbors())
        {
            if(!visited.contains(c))
            {
                visited.add(c);
                destinationTraverse(c, dst, visited);
                visited.remove(c);
            }
        }

        return false;
    }

    private City getCityByName(String city1) {
        for(City c : allCities)
        {
            if(c.getName().equals(city1))
            {
                return c;
            }
        }
        return null;
    }

    public Route findRoute(String cityOne, String cityTwo, int length, String color)
    {
        Route route = new Route(cityOne, cityTwo, length, color);
        for(Route r : claimedRoutes)
        {
            if(r.equals(route)) return r;
        }
        return null;
    }

    public String getTurn() {
        return turn;
    }

    public void endTurn() {
        List<PlayerModel> list = playerList.getPlayerList();
        list.get(turnIndex).setTurn(false);
        turnIndex = (++turnIndex) % list.size();
        turn = list.get(turnIndex).getUsername();
        list.get(turnIndex).setTurn(true);
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


    private void initalize()
    {
        setUpPlayers();
        faceUpCards = new FaceUpCards();
        claimedRoutes = new ArrayList<>();
        destDeck = GameSetUp.getInstance().getDestDeck();
        trainDeck = GameSetUp.getInstance().getTrainDeck();
        unClaimedRoutes = GameSetUp.getInstance().getUnClaimedRoutes();
        setUpFaceUpCards();
        giveTrainCards();
        giveDestinationCards();
        setColors();
        setTurn();
    }


    private void setUpFaceUpCards()
    {
        //List<TrainCard> list = new ArrayList<>();
        for(Object o : this.trainDeck.pollFive())
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

    public FaceUpCards getFaceUpCards() {
        return faceUpCards;
    }

    private void giveTrainCards()
    {
        for(PlayerModel p : playerList.getPlayerList())
        {
            assert(trainDeck.getSize() >= 4);
            p.addTrainCards(trainDeck.pollThisMany(4));
        }
    }
    private void giveDestinationCards()
    {
        for(PlayerModel p : playerList.getPlayerList())
        {
            assert(destDeck.getSize() >= 3);
            p.addDestinationards(destDeck.pollThisMany(3));
        }
    }
    private void setColors()
    {
        ArrayList<String> colors = new ArrayList<String>( Arrays.asList("green", "red", "orange", "yellow","blue"));
        Collections.shuffle(colors);

        for(int i = 0; i < playerList.getPlayerList().size(); i++)
        {
            PlayerModel p = playerList.getPlayerList().get(i);
            p.setColor(colors.get(i));
        }
    }
    private void setTurn()
    {
        PlayerModel firstGuy = playerList.getPlayerList().get(0);
        turn = firstGuy.getUsername();
        turnIndex = 0;
        firstGuy.setTurn(true);
    }

    public PlayerModel getPlayer(String username)
    {
        for(PlayerModel p : playerList.getPlayerList())
        {
            if(p.getUsername().equals(username))
                return p;
        }
        return null;
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
