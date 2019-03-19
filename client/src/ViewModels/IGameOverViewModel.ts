
export const initialState = {
  people: new Array<any>(),
  winner: "",
  mostRoutes: ""
};

export type State = Readonly<typeof initialState>;

export interface IGameOverViewModel {
  state: State;
}

