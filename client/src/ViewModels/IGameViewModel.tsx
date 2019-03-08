export const initialState = {
  
};

export type State = Readonly<typeof initialState>;

export interface IGameViewModel {
  state: State;
  props: any;
}
