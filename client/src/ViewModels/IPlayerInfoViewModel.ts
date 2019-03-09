export const initialState = {
  playerList : new Array<any>(),
  username : "ben"
};

export type State = Readonly<typeof initialState>;

export interface IPlayerInfoViewModel {
  state: State;
}
