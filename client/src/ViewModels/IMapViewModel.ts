export const initialState = {
  routeList: [
    {city1: "San Francisco", city2: "Salt Lake City"},
    {city2: "New York City", city1: "Denver"}
  ],
  apiKey: "AIzaSyDkFUwJX3CQ5gilHwiJTJh3AYrh1jXxVFw",
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};

export type State = Readonly<typeof initialState>;

export interface IMapViewModel {
  state: State;
  props: any;
}
