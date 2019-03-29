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
  ["St Louis", {lat: 38.627003, lng: -90.199402}],   
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

export const initialState = {
  apiKey: "AIzaSyDXINMbYADHRJARnNo5npJpP7DClPoyZaQ",
  center: {
    lat: 39,
    lng: -95
  },
  zoom: 4,
  ownedRoutes: null,
  isMyTurn: false,
  canClaimRoute: true
};

export type State = {
  readonly apiKey: string,
  readonly center: any,
  readonly zoom: number,
  readonly ownedRoutes: Array<Route>
  readonly isMyTurn: boolean,
  readonly canClaimRoute: boolean
}

export type CityToCoordinates = Readonly<typeof Map>

export interface IMapViewModel {
  state: State;
  props: any;
  cityToCoordinates: Map<String, any>;
  claimRoute(route: Route): void;
}
