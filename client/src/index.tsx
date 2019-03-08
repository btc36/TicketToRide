import * as React from "react";
import * as ReactDOM from "react-dom";

import { LoginRegisterViewModel } from './ViewModels/LoginRegisterViewModel';
import { GameListViewModel } from './ViewModels/GameListViewModel';
import { GameLobbyViewModel } from './ViewModels/GameLobbyViewModel';
import { MapViewModel } from './ViewModels/MapViewModel';
import { DestinationCardSelectionViewModel } from './ViewModels/DestinationCardSelectionViewModel';
import { FaceUpCardsViewModel } from './ViewModels/FaceUpCardsViewModel';
import { PlayerHandViewModel } from './ViewModels/PlayerHandViewModel';
import { PlayerInfoViewModel } from './ViewModels/PlayerInfoViewModel';

import { ClientCommunicator } from './Server/ClientCommunicator';
import { Serializer } from './Server/Serializer';
import { ExternalClientFacade } from './Services/ExternalClientFacade';

import { ClientRoot } from './Models/ClientRoot';
import { InternalClientFacade } from './Services/InternalClientFacade';
import { ServerProxy } from './Server/ServerProxy';

import { IngameClientRoot } from './Models/IngameClientRoot';
import { IngameInternalClientFacade } from './Services/IngameInternalClientFacade';
import { IngameExternalClientFacade } from './Services/IngameExternalClientFacade';
import { IngameServerProxy } from './Server/IngameServerProxy';


export const initialState = {
  "page": "faceup"
};

export type State = Readonly<typeof initialState>;

class MainComponent extends React.Component<any, any> {

  state: State = initialState;
  loginRegisterViewModel: JSX.Element = <LoginRegisterViewModel ref={(instance) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameListViewModel: JSX.Element = <GameListViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameLobbyViewModel: JSX.Element = <GameLobbyViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  mapViewModel: JSX.Element = <MapViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  destinationCardSelectionViewModel: JSX.Element = <DestinationCardSelectionViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  faceUpCardsViewModel: JSX.Element = <FaceUpCardsViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;
  playerHandViewModel: JSX.Element = <PlayerHandViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.ingameServices} />;
  playerInfoViewModel: JSX.Element = <PlayerInfoViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.ingameServices} />;

  render(): JSX.Element {
    if (this.state.page == "loginRegister") {
      return this.loginRegisterViewModel;
    } else if (this.state.page == "gameList") {
      return this.gameListViewModel;
    } else if (this.state.page == "lobbyGame") {
      return this.gameLobbyViewModel;
    } else if (this.state.page == "map") {
      return this.mapViewModel;
    } else if (this.state.page == "destination") {
      return this.destinationCardSelectionViewModel;
    } else if (this.state.page == "faceup") {
      return this.faceUpCardsViewModel;
    } else if (this.state.page == "playerhand") {
      return this.playerHandViewModel;
    } else if (this.state.page == "playerinfo") {
      return this.playerInfoViewModel;
    } else {
      return <p>Page {this.state.page} not found.</p>;
    }
  }
}

const root = new ClientRoot();
const externalClientFacade = new ExternalClientFacade(root);
const ingameExternalClientFacade = new IngameExternalClientFacade();
const serializer = new Serializer();
const clientCommunicator = new ClientCommunicator("localhost", "8080", serializer, externalClientFacade, ingameExternalClientFacade);
const serverProxy = new ServerProxy(clientCommunicator);
const internalClientFacade = new InternalClientFacade(serverProxy, root);
const ingameServerProxy = new IngameServerProxy();
const ingameRoot = new IngameClientRoot();
const ingameInternalClientFacade = new IngameInternalClientFacade(ingameServerProxy, ingameRoot);

ReactDOM.render(
  <MainComponent services={internalClientFacade} ingameServices={ingameInternalClientFacade} ingameRoot={ingameRoot} root={root}/>,
  document.getElementById("example")
);
