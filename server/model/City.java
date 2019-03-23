package model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class City {
    String name;
    List<City> neighbors;
    List<Route> routes;

    public City(){}

    public City(String name)
    {
        this.name = name;
        neighbors = new ArrayList<>();
        routes = new ArrayList<>();
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

    public void addNeighbor(City city1, City city2, City city3, City city4)
    {
        neighbors.add(city1);
        neighbors.add(city2);
        neighbors.add(city3);
        neighbors.add(city4);
    }

    public void addNeighbor(City city1, City city2, City city3, City city4, City city5)
    {
        addNeighbor(city1, city2, city3, city4);
        neighbors.add(city5);
    }
    public void addNeighbor(City city1, City city2, City city3)
    {
        neighbors.add(city1);
        neighbors.add(city2);
        neighbors.add(city3);
    }
    public void addNeighbor(City city1, City city2)
    {
        neighbors.add(city1);
        neighbors.add(city2);
    }

    public List<Route> getRoutes()
    {
        return routes;
    }

    public void addRoute(Route route) {
        if(!routes.contains(route))
        routes.add(route);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return name.equals(city.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
