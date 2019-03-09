export const initialState = {
  destinationCards: [
    {cityOne: "Provo", cityTwo: "Orem", pointValue: 5},
    {cityOne: "Salt Lake City", cityTwo: "Las Vegas", pointValue: 2},
    {cityOne: "Wendover", cityTwo: "San Francisco", pointValue: 9}
  ]
};

export type State = Readonly<typeof initialState>;

export interface IDestinationCardSelectionViewModel {
  state: State;
}
