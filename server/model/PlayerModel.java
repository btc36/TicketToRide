package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlayerModel
{
    private String username;
    private String password;
    private List<DestinationCard> destinationCards = null;
    private List<TrainCard> trainCards = null;
    private boolean turn;
    private String color;
    private int score;
    private int destCardNum;
    private int trainNum;
    private int trainCardNum;
    private List<Route> claimedRoutes;
    private Map<Integer, Integer> scoreMap = Map.of(1, 1, 2, 2, 3, 4, 4,7,5,10,6,15);
    private Map<String, Integer> colorMap = null;
    public PlayerModel() {}
    public PlayerModel(String username)
    {
        this.username = username;
        this.password = null;
    }
    public PlayerModel(String username, String password)
    {
        this.username = username;
        this.password = password;
        destCardNum = 0;
        trainNum = 0;
        trainCardNum = 0;
        score = 0;
    }

    public void startGame()
    {
        claimedRoutes = new ArrayList<>();
        colorMap = new HashMap<>();

    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<DestinationCard> getDestinationCards() {
        return destinationCards;
    }

    public void setDestinationCards(List<DestinationCard> destinationCards) {
        this.destinationCards = destinationCards;
    }

    public List<TrainCard> getTrainCards() {
        return trainCards;
    }

    public void setTrainCards(List<TrainCard> trainCards) {
        this.trainCards = trainCards;
    }

    public void addDestinationards(List<DestinationCard> destCards)
    {
        if(this.destinationCards == null)
            this.destinationCards = new ArrayList<>();
        this.destinationCards.addAll(destCards);
    }

    public void addTrainCards(List<TrainCard> trainCards)
    {
        if(this.trainCards == null)
            this.trainCards = new ArrayList<>();
        this.trainCards.addAll(trainCards);
    }

    public boolean isTurn() {
        return turn;
    }
    public boolean getTurn() {return turn;}
    public void setTurn(boolean turn) {
        this.turn = turn;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    /**
     * 1. route 2. add score, 3. decrement train card 4. decrement trains
     * @param route
     */
    public void claimRoute(Route route)
    {
        int len = route.getLength();

        claimedRoutes.add(route);

        int score = scoreMap.get(len);
        this.score += score;
        trainCardNum -= len;
        trainNum -= len;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Route> getClaimedRoutes() {
        return claimedRoutes;
    }

    public void setClaimedRoutes(List<Route> claimedRoutes) {
        this.claimedRoutes = claimedRoutes;
    }

    public Map<Integer, Integer> getScoreMap() {
        return scoreMap;
    }

    public void setScoreMap(Map<Integer, Integer> scoreMap) {
        this.scoreMap = scoreMap;
    }

    public Map<String, Integer> getColorMap() {
        return colorMap;
    }

    public void setColorMap(Map<String, Integer> colorMap) {
        this.colorMap = colorMap;
    }

    @Override
    public boolean equals(Object o)
    {
        if(o == null) return false;
        if(o instanceof PlayerModel)
        {
            PlayerModel object  = (PlayerModel) o;
            return (this.username.equals(object.username));
        }
        else { return false; }
    }

    @Override
    public int hashCode() { return this.username.hashCode(); }
}
