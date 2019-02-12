import * as React from "react";
import * as ReactDOM from "react-dom";

import { LoginRegisterViewModel } from './ViewModels/LoginRegisterViewModel';
import { GameListViewModel } from './ViewModels/GameListViewModel';
import { GameLobbyViewModel } from './ViewModels/GameLobbyViewModel';

import { ClientCommunicator } from './Server/ClientCommunicator';
import { Serializer } from './Server/Serializer';
import { ExternalClientFacade } from './Services/ExternalClientFacade';
import { ClientRoot } from './Models/ClientRoot';
import { InternalClientFacade } from './Services/InternalClientFacade';
import { ServerProxy } from './Server/ServerProxy';

export const initialState = {
  "page": "loginRegister"
};

export type State = Readonly<typeof initialState>;

class MainComponent extends React.Component<any, any> {

  state: State = initialState;
  loginRegisterViewModel: JSX.Element = <LoginRegisterViewModel ref={(instance) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameListViewModel: JSX.Element = <GameListViewModel ref={(instance) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameLobbyViewModel: JSX.Element = <GameLobbyViewModel ref={(instance) => this.props.root.attach(instance)} main={this} services={this.props.services} />;

  render(): JSX.Element {
    if (this.state.page == "loginRegister") {
      return this.loginRegisterViewModel;
    } else if (this.state.page == "gameList") {
      return this.gameListViewModel;
    } else if (this.state.page == "lobbyGame") {
      return this.gameLobbyViewModel;
    } else {
      return <p>Page {this.state.page} not found.</p>;
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
    <MainComponent services={internalClientFacade} root={root}/>,
    document.getElementById("example")
);
