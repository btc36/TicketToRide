import * as React from "react";
import GameLobbyView from "../Views/GameLobbyView";
import { initialState, State, IGameLobbyViewModel } from "./IGameLobbyViewModel";
import IObserver from "./IObserver";
import ViewModelProps from "./ViewModelProps";

export default class GameLobbyViewModel extends React.Component<ViewModelProps, State> implements IGameLobbyViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  startGameButtonPressed = (e: any) => {
    e.preventDefault();
    alert("starting game...");
  }

  render(): JSX.Element {
    return GameLobbyView(this);
  }
}
