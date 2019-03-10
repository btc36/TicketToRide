package model;

import java.util.ArrayList;
import java.util.List;

public class PlayerModel
{
    private String username;
    private String password;
    private List<DestinationCard> destinationCards = null;
    private List<TrainCard> trainCards = null;

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
