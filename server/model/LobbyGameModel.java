package model;

import java.util.*;

public class LobbyGameModel extends GameSetUp
{

    private final int LONGESTPOINT = 15;
    private PlayerModel winner;
    private int longestPoint;
    //private String longestUser = "";
    private Set<String> longestUsers;

    public Route getMatchingRoute(Route temp)
    {
        for(Route r : unClaimedRoutes)
            if(r.equals(temp)) return r;
        for(Route r : claimedRoutes)
            if(r.equals(temp)) return r;

        return null;
    }

    boolean lastRound;

    public List<Integer> getScores()
    {
        List<Integer> scores = new ArrayList<>();
        for(PlayerModel p : playerList.getPlayerList())
            scores.add(p.getScore());
        return scores;
    }

    public enum State {WAITING, ONGOING, LASTROUND, FINISHED, GAMEOVER;}
    private String gameID;
    private String gamename;
    private PlayerListModel playerList;
    private int maxPlayer;
    private int currentPlayerNum;
    private PlayerModel host;
    private State state;
    //private Deck destDeck;
    //private Deck trainDeck;
    private FaceUpCards faceUpCards;
    private List<Route> claimedRoutes;
//    private List<Route> unClaimedRoutes;
//
//    private List<City> allCities;
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
        lastRound = false;
        winner = null;
    }

    /*************************************** BEGIN START GAME ***************************************/

    public void startGame()
    {
        // set up only if the game is uninitialized
        if(this.state == State.WAITING)
        {
            this.state = State.ONGOING;
            initalize();
        }
    }

    private void initalize()
    {
        setUpPlayers();
        faceUpCards = new FaceUpCards();
        claimedRoutes = new ArrayList<>();
//        unClaimedRoutes = new ArrayList<>();
        //destDeck = new Deck();
       // trainDeck = new Deck();

        setUpDestinationCards();
        setUpTrainCards();
        setUpCities();

//        for(Object o : GameSetUp.getInstance().getDestDeck().getCards())
//            destDeck.add((DestinationCard) o);

//        for(Object o : GameSetUp.getInstance().getTrainDeck().getCards())
//            trainDeck.add((TrainCard) o);
//
//        unClaimedRoutes.addAll(GameSetUp.getInstance().getUnClaimedRoutes());
//        allCities = GameSetUp.getInstance().getAllCities();
        setUpFaceUpCards();
        giveTrainCards();
        giveDestinationCards();
        setColors();
        setTurn();
    }


    private void setUpPlayers() { for(PlayerModel p : playerList.getPlayerList()) p.startGame(); }

    private void setUpFaceUpCards()
    {
        while(faceUpCards.size() < 5)
        {
            TrainCard card = (TrainCard) this.trainDeck.poll();
            faceUpCards.addFaceUpCard(card);
        }

        if(faceUpCards.isThreeOrMoreWild())
        {
            for(TrainCard card : faceUpCards.getFaceUpCards())
                trainDeck.add(card); //add back to the deck

            faceUpCards.clear(); // then clear faceup to re set up
            setUpFaceUpCards();
        }
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
        List<DestinationCard> test = new ArrayList<>();
        test.add(new DestinationCard("Miami", "Nashville", 5));
        for(PlayerModel p : playerList.getPlayerList())
        {
            assert(destDeck.getSize() >= 3);
            p.addDestinationards(destDeck.pollThisMany(3));
            p.addDestinationards(test);
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
    /*************************************** END START GAME           ***************************************/


    /*************************************** BEGIN MIDDLE OF THE GAME ***************************************/
    public Route findRoute(String cityOne, String cityTwo, int length, String color)
    {
        Route route = new Route(cityOne, cityTwo, length, color);
        for(Route r : claimedRoutes)
        {
            if(r.equals(route)) return r;
        }
        return null;
    }

    public String getTurn() { return turn; }

    public void endTurn() {
        List<PlayerModel> list = playerList.getPlayerList();
        list.get(turnIndex).setTurn(false);
        turnIndex = (++turnIndex) % list.size();
        turn = list.get(turnIndex).getUsername();
        list.get(turnIndex).setTurn(true);
    }


    private void checkDestinationCard(PlayerModel player)
    {
        List<DestinationCard> destinationCards = player.getDestinationCards();
        //check for route
        for(DestinationCard card : destinationCards)
        {
            City src = getCityByName(card.getCity1());
            City dst = getCityByName(card.getCity2());
            if(player.claimedCity(src) && player.claimedCity(dst)) // if player doesn't have those cities, not worth calculating
            {

                Set<City> visited = new HashSet<>(); // prevents visiting same city
                if(destinationTraverse(src, dst, visited)) // if found complete the card
                    player.completeDestinaton(card);
            }
        }
    }

    private boolean destinationTraverse(City src, City dst, Set<City> visited)
    {

        List<City> neighbors = src.getNeighbors();
        if(neighbors.contains(dst))
        {
            return  true;
        }

        for(City c : src.getNeighbors())
        {
            if(!visited.contains(c))
            {
                visited.add(c);
                if(destinationTraverse(c, dst, visited))
                    return true;
                visited.remove(c);
            }
        }
        return false;
    }

    public TrainCard drawTrainCardDeck() { return destDeck.isEmpty() ? null : (TrainCard) trainDeck.poll(); }

    public TrainCard drawTrainCardFace(int index)
    {
        TrainCard card = faceUpCards.getCardAt(index);
        faceUpCards.setCardAt(index, (TrainCard) trainDeck.poll());
        setUpFaceUpCards();
        return card;
    }

    public void claimRoute(Route route, String username, List<String> colors)
    {
        unClaimedRoutes.remove(route); // for sale
        route.setClaimedBy(username); // mark the territory
        claimedRoutes.add(route); // sold list
        PlayerModel luckyGuy = getPlayer(username);
        assert (luckyGuy != null);
        City city1 = getCityByName(route.getCityOne());
        City city2 = getCityByName(route.getCityTwo());
        luckyGuy.claimRoute(route, city1, city2);
        checkDestinationCard(luckyGuy);

        for(int i = 0; i < colors.size(); i++)
            trainDeck.add(new TrainCard(colors.get(i)));

        trainDeck.shuffle();
    }

    /*************************************** FINISH BEING MIDDLE OF THE GAME ***************************************/




    /***************************************        BEGING END OF GAME      ***************************************/
    private void findWinner()
    {
        int max = 0;
        List<Integer> indices = new ArrayList<>();
        List<PlayerModel> list = playerList.getPlayerList();
        for(int i = 0; i < list.size(); i++)
        {
            PlayerModel p = list.get(i);
            if(p.getScore() >= max)
            {
                max = p.getScore();
                indices.add(i);
            }
        }

        int index = indices.get(indices.size() - 1);
        winner = list.get(index);
        System.out.println("WINNER : " + winner.getUsername());
    }
    public PlayerModel getWinner()
    {
        return winner;
    }

    public void endGame()
    {
        //do calculations here
        //this.state = State.FINISHED;
        for(PlayerModel p : playerList.getPlayerList())
            p.calculateDestination();
        findLongestRoute();
        findWinner();
    }

    private void findLongestRoute()
    {
        longestPoint = 0;
        longestUsers = new HashSet<>();
        for(PlayerModel p : playerList.getPlayerList())
        {
            String username = p.getUsername();
            List<Route> claimed = p.getClaimedRoutes();
            for(City src : p.getClaimedCities())
            {
                int length = 0;
                Set<Route> visited = new HashSet<>();
                longtraverse(src, length, claimed, visited, username);
            }
        }

        for(String longestUser : longestUsers)
        {
            PlayerModel longestPerson = getPlayer(longestUser);
            longestPerson.setScore(longestPerson.getScore() + LONGESTPOINT);
            assert(!longestUser.isEmpty());
            System.out.println("LONGEST : " + longestUser);
            System.out.println("팀빨");
            System.out.println("ㅈ 극혐");
            System.out.println("ㄱㅅㄲ ㅡㅡ ");
        }
    }

    private void longtraverse(City src, int length, List<Route> claimed, Set<Route> visited, String username)
    {
        if(longestPoint < length) // we found a better length
        {
            longestPoint = length;
            longestUsers.clear();
            longestUsers.add(username);
//            longestUser = username;
        }
        else if(longestPoint == length)
        {
            longestUsers.add(username);
        }

        List<Route> dsts = src.getRoutes();
        for (Route route : dsts)
        {
            if(claimed.contains(route) && !visited.contains(route))
            {
                visited.add(route);
                City newSource = getOtherSideCity(src, route);
                longtraverse(newSource, length + route.getLength(), claimed, visited, username);
                visited.remove(route);
            }
        }
    }

    private City getOtherSideCity(City origin, Route r)
    {
        String originName = origin.getName();
        if(originName.equals(r.getCityOne()))
            return getCityByName(r.getCityTwo());
        else if(originName.equals(r.getCityTwo()))
            return getCityByName(r.getCityOne());
        else
            return null;
    }

    /***************************************      END OF END GAME      ***************************************/


    /*************************************** BEGIN GETTERS AND SETTERS ***************************************/
    public FaceUpCards getFaceUpCards() { return faceUpCards; }
    public void addPlayer(PlayerModel player) { playerList.addPlayer(player); }
    public void removePlayer(PlayerModel player) { playerList.removePlayer(player); }

    public String getGameID() { return gameID; }
    public void setGameID(String gameID) { this.gameID = gameID; }

    public PlayerListModel getPlayerList() { return playerList; }
    public void setPlayerList(PlayerListModel playerList) { this.playerList = playerList; }

    public int getMaxPlayer() { return maxPlayer; }
    public void setMaxPlayer(int maxPlayer) { this.maxPlayer = maxPlayer; }

    public PlayerModel getHost() { return host; }
    public void setHost(PlayerModel host) { this.host = host; }

    public State getState() { return state; }
    public void setState(State state) { this.state = state; }

    public String getGamename() { return gamename; }
    public void setGamename(String gamename) { this.gamename = gamename; }

    public int getCurrentPlayerNum()
    {
        currentPlayerNum = playerList.getPlayerList().size();
        return currentPlayerNum;
    }

    public List<Route> getClaimedRoutes() { return claimedRoutes; }
    public int getTurnIndex() { return turnIndex; }
    public boolean isLastRound() { return lastRound; }
    public void setLastRound(boolean b) { lastRound = b; }
    public PlayerModel getPlayer(String username)
    {
        for(PlayerModel p : playerList.getPlayerList())
            if(p.getUsername().equals(username))
                return p;
        return null;
    }

    /*************************************** END GETTERS AND SETTERS ***************************************/

    @Override
    public int hashCode() { return gameID.hashCode(); }

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
