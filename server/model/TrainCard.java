package model;

public class TrainCard extends Card
{
    String color;
    public TrainCard()
    {

    }
    public TrainCard(String color)
    {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
