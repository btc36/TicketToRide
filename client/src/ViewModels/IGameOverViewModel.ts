import { Player } from '../Models/Player';

export const initialState = {
  people: [],
  winner: "",
  longestPaths: []
};

export type State = {
  people: Player[],
  winner: string,
  longestPaths: string[]
};

export interface IGameOverViewModel {
  state: State;
}

