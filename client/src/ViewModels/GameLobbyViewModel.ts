import * as React from "react";
import { GameLobbyView } from "../Views/GameLobbyView";
import { initialState, State, IGameLobbyViewModel } from "./IGameLobbyViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";
import { Poller } from "../Server/Poller";

export class GameLobbyViewModel extends React.Component<ViewModelProps, State> implements IGameLobbyViewModel, IObserver {

  state: State = initialState;
  poller: Poller;
  gameId: string;

  constructor(props: ViewModelProps) {
    super(props);
    this.gameId = this.props.services.getCurrentGameId();
    this.state = {
      playerList: this.props.services.getPlayerList(this.gameId)
    };
    this.props.services.getGameList();
    this.poller = new Poller("getGameList", [], 2000, this.props.services);
    this.poller.start();
  }

  componentWillUnmount(){
    this.poller.stop();
  }


  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    } else if (updateType == "updateGameList") {
      this.setState({"playerList": this.props.services.getPlayerList(this.gameId)});
    } else if (updateType == "startGame") {
      this.props.main.setState({"page": "game"});      
    }
  }

  startGameButtonPressed = (e: any) => {
    e.preventDefault();
    this.props.services.startGame(this.gameId);
  }

  render(): JSX.Element {
    return GameLobbyView(this);
  }
}
