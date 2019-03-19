package model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class City {
    String name;
    List<City> neighbors;

    public City(){}

    public City(String name)
    {
        this.name = name;
        neighbors = new ArrayList<>();
    }

    public City(String name, City[] neighbors)
    {
        this.name = name;
        this.neighbors = Arrays.asList(neighbors);
    }
    public City(String name, List<City> neighbors)
    {
        this.name = name;
        this.neighbors = neighbors;
    }

    public String getName() {
        return name;
    }

    public List<City> getNeighbors() {
        return neighbors;
    }

    public void addNeighbor(City city)
    {
        neighbors.add(city);
    }
}
