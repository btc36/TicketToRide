import { Game } from "../Models/Game";

export const initialState = {
  game: null,
  username : null
};

export type State = Readonly<typeof initialState>;

export interface IPlayerInfoViewModel {
  state: State;
}
