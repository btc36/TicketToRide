import { Player } from '../Models/Player';

export const initialState = {
  people: null,
  winner: null,
  mostRoutes: null,
  longestPaths: null
};

export type State = {
  people: Player[],
  winner: Player,
  longestPaths: string[]
  mostRoutes: Player
};

export interface IGameOverViewModel {
  state: State;
}

