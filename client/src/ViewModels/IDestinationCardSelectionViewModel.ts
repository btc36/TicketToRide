import { DestinationCard } from "../Models/DestinationCard";

export const initialState = {
  destinationCards: [new DestinationCard("Salt Lake", "Miami", 15), new DestinationCard("Boston", "Chicago", 10), new DestinationCard("Sacramento", "Mesa", 5)]
};

export type State = Readonly<typeof initialState>;

export interface IDestinationCardSelectionViewModel {
  state: State;
}
