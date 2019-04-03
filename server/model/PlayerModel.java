package model;

import java.util.*;

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
    private Set<City> claimedCities;
    //private Map<Integer, Integer> scoreMap = Map.of(1, 1, 2, 2, 3, 4, 4,7,5,10,6,15);
    private Map<String, Integer> colorMap = null;
    private int claimedDestPoint;
    private int unclaimedDestPoint;
    private boolean longestRoute;

    public PlayerModel(){}
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
        claimedDestPoint = 0;
        unclaimedDestPoint = 0;
        longestRoute = false;
    }

    public void startGame()
    {
        claimedRoutes = new ArrayList<>();
        colorMap = new HashMap<>();
        claimedCities = new HashSet<>();
        trainNum = 45;
        // FOR TESTING
        trainNum = 5;
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
    public void setDestinationCards(List<DestinationCard> destinationCards) { this.destinationCards = destinationCards; }

    public List<TrainCard> getTrainCards() {
        return trainCards;
    }
    public void setTrainCards(List<TrainCard> trainCards) { this.trainCards = trainCards; }

    public void addDestinationards(List<DestinationCard> destCards)
    {
        destCardNum += destCards.size();

        if(this.destinationCards == null)
            this.destinationCards = new ArrayList<>();
        this.destinationCards.addAll(destCards);
    }

    public void addTrainCard(TrainCard card)
    {
        if(this.trainCards == null)
            this.trainCards = new ArrayList<>();

        trainCardNum++;
        String color = card.getColor();
        int num = colorMap.getOrDefault(color, 0);
        colorMap.put(color, ++num);
        trainCards.add(card);
    }

    public void addTrainCards(List<TrainCard> trainCards)
    {
        for(TrainCard card : trainCards) addTrainCard(card);
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
    public void claimRoute(Route route, City city1, City city2, List<String> colors)
    {
        int len = route.getLength();

        claimedCities.add(city1);
        claimedCities.add(city2);
        claimedRoutes.add(route);

        for(String color : colors)
        {
            int num = colorMap.getOrDefault(color, 0);
            assert (num > 0);
            colorMap.put(color, --num);
        }
        //this.score += score;
        trainCardNum -= len;
        trainNum -= len;
    }

    public void completeDestination(DestinationCard card)
    {
        //score += card.getPointValue();
        card.complete();
    }

    public void calculateDestination()
    {
        for(DestinationCard card : destinationCards)
        {
            if(card.isCompleted())
            {
                claimedDestPoint += card.getPointValue();
                score += card.getPointValue();
            }
            else
            {
                score -= card.getPointValue();
                unclaimedDestPoint -= card.getPointValue();;
               // if(score < 0) score = 0;
            }
        }
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) { this.score = score; }
    public void addScore(int score) { this.score += score; }

    public List<Route> getClaimedRoutes() {
        return claimedRoutes;
    }

    public void setClaimedRoutes(List<Route> claimedRoutes) {
        this.claimedRoutes = claimedRoutes;
    }

    public Map<String, Integer> getColorMap() {
        return colorMap;
    }
    public int getColorNum(String color) { return colorMap.getOrDefault(color, 0); }

    public void setColorMap(Map<String, Integer> colorMap) {
        this.colorMap = colorMap;
    }

    public int getDestCardNum() { return destCardNum; }
    public void setDestCardNum(int destCardNum) { this.destCardNum = destCardNum; }

    public int getTrainNum() { return trainNum; }

    public void setTrainNum(int trainNum) { this.trainNum = trainNum; }

    public int getTrainCardNum() { return trainCardNum; }

    public void setTrainCardNum(int trainCardNum) {
        this.trainCardNum = trainCardNum;
    }

    public int getClaimedDestPoint() { return claimedDestPoint; }

    public void setClaimedDestPoint(int claimedDestPoint) { this.claimedDestPoint = claimedDestPoint; }

    public int getUnclaimedDestPoint() { return unclaimedDestPoint; }

    public void setUnclaimedDestPoint(int unclaimedDestPoint) { this.unclaimedDestPoint = unclaimedDestPoint; }

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

    public boolean isLongestRoute() { return longestRoute; }

    public void setLongestRoute(boolean longestRoute) { this.longestRoute = longestRoute; }

    public void removeDestinationCard(DestinationCard card)
    {
        destinationCards.remove(card);
        destCardNum--;
    }

    public void removeTrainCard(String color) {
        int index = -1;
        for (int i = 0; i < trainCards.size(); i++) {
            if (trainCards.get(i).color == color) {
                index = i;
                break;
            }
        }
        if (index != -1)
            trainCards.remove(index);
    }

    public boolean claimedCity(City city) { return claimedCities.contains(city); }

    public Set<City> getClaimedCities() { return claimedCities; }

    public void setClaimedCities(Set<City> claimedCities) { this.claimedCities = claimedCities; }

    public boolean sufficientResource(Route r, String selectedColor)
    {

        //final String grey = "grey";
        final int length = r.getLength();
        // if total is less than the length. not even worth checking
        if(trainNum < length || trainCardNum < length)
            return false;

        //TODO: trainCardNUm check
        return checkColor(selectedColor, length);
    }
    private boolean checkColor(String color, int length)
    {
        final String rainbow = "rainbow";
        int colorNum = colorMap.getOrDefault(color, 0);
        if(length <= colorNum)
            return true;
        else
            return ((colorNum + colorMap.getOrDefault(rainbow, 0)) >= length);
    }
}
