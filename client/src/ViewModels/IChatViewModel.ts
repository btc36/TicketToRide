
export const initialState = {
  messageList: new Array<any>(),
  currentMessage: ""
};

export type State = Readonly<typeof initialState>;

export interface IChatViewModel {
  state: State;
  updateMessage: any;
  sendChat: any;
}
