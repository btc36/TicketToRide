import { Player } from "../Models/Player";

const initialPlayerList: Array<Player> = [];

export const initialState = {
  playerList: initialPlayerList
};

export type State = Readonly<typeof initialState>;

export interface IGameLobbyViewModel {
  state: State;
  startGameButtonPressed(e: any): void;
}
