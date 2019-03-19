package model;


import java.util.Objects;

public class Route {
    private String color;
    private int length;
    private String cityOne;
    private String cityTwo;
    private String claimedBy;

    public Route()
    {

    }

    public Route(String cityOne, String cityTwo, int length, String color)
    {
        this.cityOne = cityOne;
        this.cityTwo = cityTwo;
        this.length = length;
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getCityOne() {
        return cityOne;
    }

    public void setCityOne(String cityOne) {
        this.cityOne = cityOne;
    }

    public String getCityTwo() {
        return cityTwo;
    }

    public void setCityTwo(String cityTwo) {
        this.cityTwo = cityTwo;
    }

    public String getClaimedBy() {
        return claimedBy;
    }

    public void setClaimedBy(String claimedBy) {
        this.claimedBy = claimedBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Route route = (Route) o;
        return length == route.length && color.equals(route.color) &&
        (
            (cityOne.equals(route.cityOne) && cityTwo.equals(route.cityTwo)) ||
            (cityOne.equals(route.cityTwo) && cityTwo.equals(route.cityOne))
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(color, length, cityOne, cityTwo);
    }
}
