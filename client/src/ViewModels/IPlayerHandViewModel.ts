import { PlayerHand } from "../Models/PlayerHand";

export const initialState = {
  playerHand: null,
  preferredColor: null
};

export type State = {
  readonly playerHand: PlayerHand,
  readonly preferredColor: String,
}

export interface IPlayerHandViewModel {
  state: State;
  refreshHand(e: any): void;
  selectPreferredCard(e: any): void;
}
