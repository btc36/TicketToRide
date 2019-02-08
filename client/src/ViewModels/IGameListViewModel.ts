const initialGameList: any[] = [
  { id: 0, name: "Name numero uno", maxPlayers: 3, activePlayers: 0 },
  { id: 1, name: "Dos tacos amigo", maxPlayers: 4, activePlayers: 1 },
  { id: 2, name: "Tres musketeers", maxPlayers: 2, activePlayers: 2 },
];

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
