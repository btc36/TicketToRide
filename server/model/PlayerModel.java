package model;

import java.util.ArrayList;
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
    private List<Route> claimedRoutes;
    private Map<Integer, Integer> scoreMap = Map.of(1, 1, 2, 2, 3, 4, 4,7,5,10,6,15);
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

    }

    public void startGame()
    {
        claimedRoutes = new ArrayList<>();

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

    // update score and add route
    public void claimRoute(Route route, String username)
    {
        int score = scoreMap.get(route.getLength());
        this.score += score;
        claimedRoutes.add(route);
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
