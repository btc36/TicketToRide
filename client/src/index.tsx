import * as React from "react";
import * as ReactDOM from "react-dom";

import LoginRegisterViewModel from './ViewModels/LoginRegisterViewModel';
import GameListViewModel from './ViewModels/GameListViewModel';
import GameLobbyViewModel from './ViewModels/GameLobbyViewModel';

export const initialState = {
  "page": "loginRegister"
};

export type State = Readonly<typeof initialState>;

class MainComponent extends React.Component<any, any> {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  render(): JSX.Element {
    if (this.state.page == "loginRegister") {
      return <LoginRegisterViewModel main={this} />;
    } else if (this.state.page == "gameList") {
      return <GameListViewModel main={this} />;
    } else if (this.state.page == "gameLobby") {
      return <GameLobbyViewModel main={this} />;
    }
  }
}

const serverProxy = new ServerProxy();
const internalClientFacade = new InternalClientFacade(serverProxy);

ReactDOM.render(
    <MainComponent services={internalClientFacade}/>,
    document.getElementById("example")
);
