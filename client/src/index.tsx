import * as React from "react";
import * as ReactDOM from "react-dom";

import { LoginRegisterViewModel } from './ViewModels/LoginRegisterViewModel';
import { GameListViewModel } from './ViewModels/GameListViewModel';
import { GameLobbyViewModel } from './ViewModels/GameLobbyViewModel';

import { ClientCommunicator } from './Services/ClientCommunicator';
import { Serializer } from './Services/Serializer';
import { ExternalClientFacade } from './Services/ExternalClientFacade';
import { ClientRoot } from './Models/ClientRoot';
import { InternalClientFacade } from './Services/InternalClientFacade';
import { ServerProxy } from './Server/ServerProxy';

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
      return <LoginRegisterViewModel main={this} services={this.props.services} />;
    } else if (this.state.page == "gameList") {
      return <GameListViewModel main={this} services={this.props.services} />;
    } else if (this.state.page == "gameLobby") {
      return <GameLobbyViewModel main={this} services={this.props.services} />;
    }
  }
}

const root = new ClientRoot();
const externalClientFacade = new ExternalClientFacade(root);
const serializer = new Serializer();
const clientCommunicator = new ClientCommunicator("localhost", "8080", serializer, externalClientFacade);
const serverProxy = new ServerProxy(clientCommunicator);
const internalClientFacade = new InternalClientFacade(serverProxy, root);

ReactDOM.render(
    <MainComponent services={internalClientFacade}/>,
    document.getElementById("example")
);
