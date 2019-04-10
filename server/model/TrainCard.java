package model;

import java.io.Serializable;

public class TrainCard implements Serializable
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
