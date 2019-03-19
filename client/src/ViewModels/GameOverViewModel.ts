import * as React from "react";
import { GameOverView } from "../Views/GameOverView";
import { initialState, State, IGameOverViewModel } from "./IGameOverViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class GameOverViewModel extends React.Component<any, State> implements IGameOverViewModel, IObserver {

  state: State = initialState;

  constructor(props: IngameViewModelProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      people: [
        { name: "Lincoln", score: 10, numTrains: 20, dcEarned: 50, dcLost: 10 },
        { name: "Ben", score: 10, numTrains: 20, dcEarned: 50, dcLost: 10 },
        { name: "Brennah", score: 10, numTrains: 20, dcEarned: 50, dcLost: 10 },
        { name: "Jake", score: 10, numTrains: 20, dcEarned: 50, dcLost: 10 },
        { name: "Jordan", score: 10, numTrains: 20, dcEarned: 50, dcLost: 10 }
      ],
      winner: "Lincoln",
      mostRoutes: "Lincoln"
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

