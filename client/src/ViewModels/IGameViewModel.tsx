export const initialState = {
  currentPlayer: "<not a player>"
};

export type State = Readonly<typeof initialState>;


export interface IGameViewModel {
  state: State;
  props: any;
  mapViewModel: JSX.Element;
  destinationCardSelectionViewModel: JSX.Element ;
  faceUpCardsViewModel: JSX.Element;
  playerHandViewModel: JSX.Element;
  playerInfoViewModel: JSX.Element;
  chatViewModel: JSX.Element;
  onClickRandomize(e: any): void;
}
