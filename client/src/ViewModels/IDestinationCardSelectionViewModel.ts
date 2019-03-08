export const initialState = {
  destinationCards: [
    {route: {cityOne: "Provo", cityTwo: "Orem"}, pointValue: 5},
    {route: {cityOne: "Salt Lake City", cityTwo: "Las Vegas"}, pointValue: 2},
    {route: {cityOne: "Wendover", cityTwo: "San Francisco"}, pointValue: 9}
  ]
};

export type State = Readonly<typeof initialState>;

export interface IDestinationCardSelectionViewModel {
  state: State;
}
