import { Player } from '../Models/Player';

export const initialState = {
  people: null,
  winner: null,
  mostRoutes: null
};

export type State = {
  people: Player[],
  winner: Player,
  mostRoutes: Player
};

export interface IGameOverViewModel {
  state: State;
}

