import { Route } from "./Route";

export class GameMap {
    routes: Array<Route>;

    getRouteByIndex(index: number): Route {
        return this.routes[index];
    }
}

export const AllRoutes = [
  new Route("Seattle", "Portland", 1, "grey"),
  new Route("Seattle", "Helena", 6, "yellow"),
  new Route("Helena", "Salt Lake City", 3, "pink"),
  new Route("Salt Lake City", "San Francisco", 5, "white"),
  new Route("San Francisco", "Los Angeles", 3, "pink"),
  new Route("Portland", "Salt Lake City", 6, "blue"),
  new Route("Portland", "San Francisco", 6, "green"),
  new Route("Los Angeles", "Las Vegas", 2, "grey"),
  new Route("Las Vegas", "Salt Lake City", 3, "orange"),
  new Route("Helena", "Denver", 4, "green"),
  new Route("Salt Lake City", "Denver", 3, "red"),
  new Route("Los Angeles", "Phoenix", 3, "grey"),
  new Route("Los Angeles", "El Paso", 6, "black"),
  new Route("Phoenix", "Denver", 5, "white"),
  new Route("Phoenix", "Santa Fe", 3, "grey"),
  new Route("Phoenix", "El Paso", 3, "grey"),
  new Route("El Paso", "Santa Fe", 2, "grey"),
  new Route("El Paso", "Oklahoma City", 5, "yellow"),
  new Route("El Paso", "Dallas", 4, "red"),
  new Route("El Paso", "Houston", 6, "green"),
  new Route("Oklahoma City", "Santa Fe", 3, "blue"),
  new Route("Oklahoma City", "Denver", 4, "red"),
  new Route("Oklahoma City", "Kansas City", 2, "grey"),
  new Route("Oklahoma City", "Little Rock", 2, "grey"),
  new Route("Oklahoma City", "Dallas", 2, "grey"),
  new Route("Kansas City", "Denver", 4, "black"),
  new Route("Kansas City", "Saint Louis", 2, "blue"),
  new Route("Kansas City", "Omaha", 1, "grey"),
  new Route("Omaha", "Denver", 4, "pink"),
  new Route("Omaha", "Helena", 5, "red"),
  new Route("Omaha", "Duluth", 2, "grey"),
  new Route("Omaha", "Chicago", 4, "blue"),
  new Route("Little Rock", "Dallas", 2, "grey"),
  new Route("Little Rock", "New Orleans", 3, "green"),
  new Route("Little Rock", "Saint Louis", 2, "grey"),
  new Route("Little Rock", "Nashville", 3, "white"),
  new Route("Helena", "Duluth", 6, "orange"),
  new Route("Santa Fe", "Denver", 2, "grey"),
  new Route("Dallas", "Houston", 1, "grey"),
  new Route("Chicago", "Duluth", 3, "red"),
  new Route("Chicago", "Pittsburgh", 3, "orange"),
  new Route("Chicago", "Saint Louis", 2, "white"),
  new Route("New Orleans", "Houston", 2, "grey"),
  new Route("New Orleans", "Atlanta", 4, "yellow"),
  new Route("New Orleans", "Miami", 6, "red"),
  new Route("Nashville", "Saint Louis", 2, "grey"),
  new Route("Nashville", "Pittsburgh", 4, "yellow"),
  new Route("Nashville", "Raleigh", 3, "black"),
  new Route("Nashville", "Atlanta", 1, "grey"),
  new Route("Saint Louis", "Pittsburgh", 5, "green"),
  new Route("Pittsburgh", "New York", 2, "white"),
  new Route("Pittsburgh", "Washington DC", 2, "grey"),
  new Route("Pittsburgh", "Raleigh", 2, "grey"),
  new Route("New York", "Boston", 2, "red"),
  new Route("New York", "Washington DC", 2, "black"),
  new Route("Washington DC", "Raleigh", 2, "grey"),
  new Route("Raleigh", "Charleston", 2, "grey"),
  new Route("Raleigh", "Atlanta", 2, "grey"),
  new Route("Atlanta", "Charleston", 2, "grey"),
  new Route("Atlanta", "Miami", 5, "blue"),
  new Route("Charleston", "Miami", 4, "pink")
];

