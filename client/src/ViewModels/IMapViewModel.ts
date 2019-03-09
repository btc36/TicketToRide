import { Route } from "../Models/Route";

export const cityToCoordinates = new Map([
  ["Boston", {lat: 42.36, lng: -71.05}],
  ["Duluth", {lat: 46.78, lng: -92.1}], 
  ["Helena", {lat: 46.58, lng: -112.04}], 
  ["Seattle", {lat: 47.606, lng: -122.33}],
  ["Portland", { lat: 45.512230, lng: -122.658}],  
  ["San Francisco", { lat: 37.774929, lng: -122.419418}],  
  ["Salt Lake City", {lat: 40.760780, lng: -111.891045}],   
  ["Denver", {lat: 39.739235, lng: -104.990250}],   
  ["Omaha", {lat: 41.256538, lng: -95.934502}],   
  ["Chicago", {lat: 41.878113, lng: -87.629799}],   
  ["Pittsburgh", {lat: 40.440624, lng: -79.995888}],  
  ["New York", {lat: 40.712776, lng: -74.005974}],   
  ["Washington DC", {lat: 38.907192, lng: -77.036873}],   
  ["Raleigh", {lat: 35.779591, lng: -78.638176}],   
  ["Nashville", {lat: 36.162663, lng: -86.781601}],   
  ["Saint Louis", {lat: 38.627003, lng: -90.199402}],   
  ["Kansas City", {lat: 39.099728, lng: -94.578568}],   
  ["Charleston", {lat: 32.776474, lng: -79.931053}],   
  ["Atlanta", {lat: 33.748997, lng: -84.387985}],  
  ["Little Rock", {lat: 34.746483, lng: -92.289597}],   
  ["Oklahoma City", {lat: 35.467560, lng: -97.516426}],  
  ["Santa Fe", {lat: 35.686974, lng: -105.937798}],  
  ["Las Vegas", {lat: 36.169941, lng: -115.139832}],   
  ["Los Angeles", {lat: 34.052235, lng: -118.243683}],   
  ["Phoenix", {lat: 33.448376, lng: -112.074036}],   
  ["El Paso", {lat: 31.761877, lng: -106.485023}],   
  ["Dallas", {lat: 32.776665, lng: -96.796989}],  
  ["Houston", {lat: 29.760427, lng: -95.369804}],   
  ["New Orleans", {lat: 29.951065, lng: -90.071533}],   
  ["Miami", {lat: 25.761681, lng: -80.191788}]
]);

export const routes = [
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

export const initialState = {
  apiKey: "AIzaSyDXINMbYADHRJARnNo5npJpP7DClPoyZaQ",
  center: {
    lat: 39,
    lng: -95
  },
  zoom: 4,
  ownedRoutes: null
};

export type State = {
  readonly apiKey: string,
  readonly center: any,
  readonly zoom: number,
  readonly ownedRoutes: Array<Route>
}

export type CityToCoordinates = Readonly<typeof Map>

export interface IMapViewModel {
  state: State;
  props: any;
  cityToCoordinates: Map<String, any>;
}
