import { PlayerHand } from "../Models/PlayerHand";

export const initialState = {
  playerHand: null
};

export type State = {
  readonly playerHand: PlayerHand,
}

export interface IPlayerHandViewModel {
  state: State;
  refreshHand(e: any): void;
}
