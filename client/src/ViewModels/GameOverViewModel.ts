import * as React from "react";
import { GameOverView } from "../Views/GameOverView";
import { initialState, State, IGameOverViewModel } from "./IGameOverViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class GameOverViewModel extends React.Component<IngameViewModelProps, State> implements IGameOverViewModel, IObserver {

  state: State = initialState;

  constructor(props: IngameViewModelProps) {
    super(props);
  }

  componentDidMount() {
    const people = this.props.services.getPlayers();
    const winner = this.props.services.getWinner();
    const mostRoutes = this.props.services.getPlayerWithMostRoutes();
    this.setState({
      people: people,
      winner: winner,
      mostRoutes: mostRoutes
    });
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return GameOverView(this);
  }
}

