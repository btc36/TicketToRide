import {GameList} from "../Models/GameListModel";

const initialGameList: GameList = new GameList();

export const initialState = {
  gameList: initialGameList,
  selectedGame: -1,
  createGameName: "",
  createGameNumPlayers: ""
};

export type State = Readonly<typeof initialState>;

export interface IGameListViewModel {
  state: State;
  createGameButtonPressed(e: any): void;
  joinGameButtonPressed(e: any): void;
  tableRowPressed(index: number): void;
  onCreateGameNameChange(e: any): void;
  onCreateGameNumPlayersChange(e: any): void;
  isJoinGameButtonDisabled(): boolean;
}
