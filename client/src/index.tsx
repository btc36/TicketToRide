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
import { GameViewModel } from "./ViewModels/GameViewModel";

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
import {Game} from "./Models/Game";
import {GameList} from "./Models/GameList";
import {LobbyGame} from "./Models/LobbyGame";
import {Player} from "./Models/Player";


export const initialState = {
  "page": "loginRegister"
};

export type State = Readonly<typeof initialState>;

class MainComponent extends React.Component<any, any> {

  state: State = initialState;

  loginRegisterViewModel: JSX.Element = <LoginRegisterViewModel ref={(instance) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameListViewModel: JSX.Element = <GameListViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameLobbyViewModel: JSX.Element = <GameLobbyViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} services={this.props.services} />;
  gameViewModel: JSX.Element = <GameViewModel ref={(instance: any) => this.props.root.attach(instance)} main={this} ingameServices={this.props.ingameServices}  ingameRoot={ingameRoot}/>;

  render(): JSX.Element {
    if (this.state.page == "loginRegister") {
      return this.loginRegisterViewModel;
    } else if (this.state.page == "game") {
      return this.gameViewModel;
    } else if (this.state.page == "gameList") {
      return this.gameListViewModel;
    } else if (this.state.page == "lobbyGame") {
      return this.gameLobbyViewModel;
    } else {
      return <p>Page {this.state.page} not found.</p>;
    }
  }
}

/**
 * TODO: SETUP stuffs.
 */

// // With this setup, sending chat takes to list of games
// const player = new Player("user1");
// const game = new LobbyGame("game1", player, "f", 3);
// const games = new GameList();
// games.addGame(game);


const root = new ClientRoot();
// root.gameList = games;
// root.myPlayer = player;

const externalClientFacade = new ExternalClientFacade(root);

const ingameRoot = new IngameClientRoot();

const ingameExternalClientFacade = new IngameExternalClientFacade(ingameRoot);
const serializer = new Serializer();
const clientCommunicator = new ClientCommunicator("localhost", "8080", serializer, externalClientFacade, ingameExternalClientFacade);
const serverProxy = new ServerProxy(clientCommunicator);
const internalClientFacade = new InternalClientFacade(serverProxy, root);
const ingameServerProxy = new IngameServerProxy(clientCommunicator);

const ingameInternalClientFacade = new IngameInternalClientFacade(ingameServerProxy, ingameRoot);

ReactDOM.render(
  <MainComponent services={internalClientFacade} ingameServices={ingameInternalClientFacade} ingameRoot={ingameRoot} root={root}/>,
  document.getElementById("example")
);
