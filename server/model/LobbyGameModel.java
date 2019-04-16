package model;

import java.io.Serializable;
import java.util.*;

public class LobbyGameModel extends GameSetUp implements Serializable
{

    public enum State {WAITING, ONGOING, LASTROUND, FINISHED, GAMEOVER;}
    private State state;
    private Map<Integer, Integer> scoreMap = Map.of(1, 1, 2, 2, 3, 4, 4,7,5,10,6,15);

    /**
     * START
     */
    private String gameID;
    private String gamename;
    private int maxPlayer;
    private int currentPlayerNum;
    private PlayerModel host;
    private PlayerListModel playerList;

    /**
     * MIDDLE
     */
    private FaceUpCards faceUpCards;
    private List<Route> claimedRoutes;
    private String turn;
    private int turnIndex;

    /**
     * END
     */
    private final int LONGESTPOINT = 10;
    private String lastTurn;
    private PlayerModel winner;
    private int longestPath;
    private Set<String> longestUsers;
    boolean lastRound;
    private List<Integer> claimedPoints;
    private List<Integer> unClaimedPoints;

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename, String gameID) { }

    public LobbyGameModel(PlayerModel host, int maxPlayer, String gamename)
    {
        playerList = new PlayerListModel();
        //TODO: UNCOMMENT AFTER DONE WITH TESTING
        // gameID = gamename; // UUID.randomUUID().toString().substring(0,4);
        gameID = UUID.randomUUID().toString().substring(0,4);
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
        lastTurn = "";
        winner = null;
        claimedPoints = new ArrayList<>();
        unClaimedPoints = new ArrayList<>();
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
        longestUsers = new HashSet<>();
        /*Cities and Routes*/
        setUpCities();

        /* Train Card */
        setUpTrainCards();
        setUpFaceUpCards();
        giveTrainCards();

        /* Destination Card */
        setUpDestinationCards();
        giveDestinationCards();

        /* player colors and turn */
        setColors();
        setTurn();
    }

    private void setUpPlayers() { for(PlayerModel p : playerList.getPlayerList()) p.startGame(); }

    //recurse until faceup is good
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
        // test.add(new DestinationCard("Miami", "Nashville", 5));
        for(PlayerModel p : playerList.getPlayerList())
        {
            assert(destDeck.getSize() >= 3);
            p.addDestinationards(destDeck.pollThisMany(3));
            // p.addDestinationards(test);
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
    /***************************************       END START GAME     ***************************************/


    /*************************************** BEGIN MIDDLE OF THE GAME ***************************************/
    public Route findRoute(String cityOne, String cityTwo, int length, String color)
    {
        Route route = new Route(cityOne, cityTwo, length, color);
        for(Route r : claimedRoutes)
            if(r.equals(route)) return r;

        return null;
    }

    public String getTurn() { return turn; }

    public void endTurn() {
        List<PlayerModel> list = playerList.getPlayerList();
        list.get(turnIndex).setTurn(false);
        System.out.print("Turn changed from " + list.get(turnIndex).getUsername());
        turnIndex = (++turnIndex) % list.size();
        turn = list.get(turnIndex).getUsername();
        System.out.println(" to " + list.get(turnIndex).getUsername());
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
                    player.completeDestination(card);
            }
        }
    }

    private boolean destinationTraverse(City src, City dst, Set<City> visited)
    {
        List<City> neighbors = src.getNeighbors();
        if(neighbors.contains(dst)) // reached destination
        {
            return true;
        }

        for(Route r : src.getRoutes())
        {
            City newSource = getOtherSideCity(src, r); // opposite end of source city
            if(!visited.contains(newSource))
            {
                visited.add(newSource);
                if(destinationTraverse(newSource, dst, visited))
                    return true;
                visited.remove(newSource);
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

    public void claimRoute(Route route, String username, String color)
    {
        unClaimedRoutes.remove(route); // for sale
        route.setClaimedBy(username); // mark the territory
        claimedRoutes.add(route); // sold list

        PlayerModel luckyGuy = getPlayer(username);
        assert (luckyGuy != null);

        int routeLength = route.getLength();
        int colorNum = luckyGuy.getColorNum(color);
        List<String> colors = putBackToDeck(color, colorNum, routeLength);

        City city1 = getCityByName(route.getCityOne());
        City city2 = getCityByName(route.getCityTwo());
        luckyGuy.claimRoute(route, city1, city2, colors);
        luckyGuy.addScore(scoreMap.get(routeLength));

//        checkDestinationCard(luckyGuy);
    }

    private List<String> putBackToDeck(String color, int colorNum, int routeLength)
    {
        List<String> colors = new ArrayList<>();
        //  2 blue  <  blue 3
        if(colorNum < routeLength)
        {
            int rainbow = routeLength - colorNum;
            for(int i = 0; i < colorNum; i++)
            {
                trainDeck.add(new TrainCard(color));
                colors.add(color);
            }
            for(int i = 0; i < rainbow; i++)
            {
                trainDeck.add(new TrainCard("rainbow"));
                colors.add("rainbow");
            }
        }
        else
        {
            for(int i = 0; i < routeLength; i++)
            {
                trainDeck.add(new TrainCard(color));
                colors.add(color);
            }
        }
        return colors;
    }
    /*************************************** FINISH BEING MIDDLE OF THE GAME ***************************************/


    /***************************************        BEGING END OF GAME      ***************************************/
    private void findWinner()
    {
        // avoid duplicate calculation from polling
        if(winner != null) return;

        int max = Integer.MIN_VALUE;
        List<Integer> indices = new ArrayList<>();
        List<PlayerModel> list = playerList.getPlayerList();
        for(int i = 0; i < list.size(); i++)
        {
            PlayerModel p = list.get(i);
            if(max < p.getScore())
            {
                max = p.getScore();
                indices.clear();
                indices.add(i);
            }
            else if(max == p.getScore())
                indices.add(i);
        }

        winner = list.get(indices.get(0));
        if(indices.size() > 1) // tie breaker
        {
            for(int i : indices)
            {
                PlayerModel p = list.get(i);
                if(p.isLongestRoute())
                {
                    winner = p;
                    break;
                }
            }
        }
        System.out.println("WINNER : " + winner.getUsername());
    }

    public PlayerModel getWinner() { return winner; }

    public void endGame()
    {
        //this.state = State.FINISHED;

        for(PlayerModel p : getPlayers())
        {
            checkDestinationCard(p);
            p.calculateDestination();
        }
        findLongestRoute();
        findWinner();
    }

    // longest traversal wrapper class
    private void findLongestRoute()
    {
        longestPath = 0;

        // avoid duplicate calculation from polling
        if(!longestUsers.isEmpty()) return;

        for(PlayerModel p : playerList.getPlayerList())
        {
            String username = p.getUsername();
            List<Route> claimed = p.getClaimedRoutes();
            for(City src : p.getClaimedCities())
            {
                int length = 0;
                Set<Route> visited = new HashSet<>();
                longTraverse(src, length, claimed, visited, username);
            }
        }

        for(String longestUser : longestUsers)
        {
            PlayerModel longestPerson = getPlayer(longestUser);
            longestPerson.setLongestRoute(true);
            longestPerson.setScore(longestPerson.getScore() + LONGESTPOINT);
            System.out.println("LONGEST : " + longestUser);
            System.out.println("ㄸㅣㅏㅃㅏㄹ");
            System.out.println("ㅈ 머가리부셔부라거");
            System.out.println("ㄱㅅㄲ --------ㅡㅡㅡㅡㅡㅡㅡ ");
        }
    }

    // traversal for longest route
    private void longTraverse(City src, int length, List<Route> claimed, Set<Route> visited, String username)
    {
        if(!getPlayer(username).claimedCity(src)) return; // used for backtracking

        // we found a better length. add username to a clean slate
        if(longestPath < length)
        {
            longestPath = length; //longest path so far
            longestUsers.clear();
            longestUsers.add(username);
        }
        else if(longestPath == length) longestUsers.add(username);

        List<Route> dsts = src.getRoutes();
        for (Route route : dsts)
        {
            if(claimed.contains(route) && !visited.contains(route))
            {
                visited.add(route);
                City newSource = getOtherSideCity(src, route);
                longTraverse(newSource, length + route.getLength(), claimed, visited, username);
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
    public void addPlayer(PlayerModel player)
    {
        if(!playerList.findPlayer(player))
            playerList.addPlayer(player);
    }
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
        currentPlayerNum = getPlayers().size();
        return currentPlayerNum;
    }

    public List<Route> getClaimedRoutes() { return claimedRoutes; }
    public int getTurnIndex() { return turnIndex; }
    public boolean isLastRound() { return lastRound; }
    public void setLastRound(boolean b) { lastRound = b; }
    public PlayerModel getPlayer(String username)
    {
        for(PlayerModel p : getPlayers())
            if(p.getUsername().equals(username))
                return p;
        return null;
    }

    public Set<String> getLongestUsers() { return longestUsers; }

    public Route getMatchingRoute(Route temp)
    {
        for(Route r : unClaimedRoutes)
            if(r.equals(temp)) return r;
        for(Route r : claimedRoutes)
            if(r.equals(temp)) return r;

        return null;
    }

    public List<Integer> getScores()
    {
        List<Integer> scores = new ArrayList<>();
        for(PlayerModel p : getPlayers())
            scores.add(p.getScore());
        return scores;
    }

    public void setLastTurn(String username) { lastTurn = username; }
    public String getLastTurn() { return lastTurn; }

    public List<Integer> getUnClaimedPoints()
    {
        if(state == State.ONGOING) return unClaimedPoints;

        if(unClaimedPoints.size() != getPlayers().size() && state == State.FINISHED)
        {
            unClaimedPoints.clear();
            for(PlayerModel p : getPlayers())
                unClaimedPoints.add(p.getUnclaimedDestPoint());
        }

        return unClaimedPoints;
    }
    public List<Integer> getClaimedPoints()
    {
        if(state == State.ONGOING) return claimedPoints;

        if(claimedPoints.size() != getPlayers().size() && state == State.FINISHED)
        {
            claimedPoints.clear();
            for(PlayerModel p : getPlayers())
                claimedPoints.add(p.getClaimedDestPoint());
        }


        return claimedPoints;
    }

    public void lastRound(String username)
    {
        if(lastTurn.equals("")) lastTurn = username;
        state = State.LASTROUND;
    }

    private List<PlayerModel> getPlayers() { return playerList.getPlayerList(); }


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
