package model;

public class DestinationCard
{
    private String city1;
    private String city2;
    private int pointValue;
    private boolean completed;
    public DestinationCard(){}

    public DestinationCard(String city1, String city2, Integer point)
    {
        this.city1= city1;
        this.city2 = city2;
        this.pointValue = point;
        this.completed = false;
    }

    public String getCity1() {
        return city1;
    }

    public void setCity1(String city1) {
        this.city1 = city1;
    }

    public String getCity2() {
        return city2;
    }

    public void setCity2(String city2) {
        this.city2 = city2;
    }

    public int getPointValue() {
        return pointValue;
    }

    public void setPointValue(Integer pointValue) {
        this.pointValue = pointValue;
    }

    public void complete() { this.completed = true; }

    public boolean isCompleted() { return this.completed;}
}
