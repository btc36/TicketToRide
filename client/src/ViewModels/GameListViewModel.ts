import * as React from "react";
import { GameListView } from "../Views/GameListView";
import { initialState, State, IGameListViewModel } from "./IGameListViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class GameListViewModel extends React.Component<ViewModelProps, State> implements IGameListViewModel, IObserver {

  state: State;

  constructor(props) {
    super(props);
    this.state = initialState;
    this.props.services.getGameList();
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    } else if (updateType == "updateGameList") {
      this.setState({"gameList": data});
    }
  }

  createGameButtonPressed = (e: any) => {
    e.preventDefault();
    this.props.services.createGame(this.state.createGameNumPlayers, this.state.createGameName);
  }

  joinGameButtonPressed = (e: any) => {
    e.preventDefault();
    const gameName: string = String(this.state.gameList[this.state.selectedGame].name);
    const gameId: string = String(this.state.gameList[this.state.selectedGame].id);
    this.props.services.joinGame(gameName, gameId);
  }

  tableRowPressed = (index: number) => {
    this.setState({selectedGame: index});
  }

  onCreateGameNameChange = (e: any) => {
    this.setState({createGameName: e.target.value});
  }

  onCreateGameNumPlayersChange = (e: any) => {
    this.setState({createGameNumPlayers: e.target.value});
  }


  isJoinGameButtonDisabled = () => {
    return this.state.selectedGame != -1;
  }

  render(): JSX.Element {
    return GameListView(this);
  }
}
