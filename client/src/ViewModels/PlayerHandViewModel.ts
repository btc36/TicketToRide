import * as React from "react";
import { PlayerHandView } from "../Views/PlayerHandView";
import { initialState, State, IPlayerHandViewModel } from "./IPlayerHandViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class PlayerHandViewModel extends React.Component<IngameViewModelProps, State> implements IPlayerHandViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  componentDidMount() {
    this.setState({ playerHand: this.props.services.getPlayerHand() });
  }

  render(): JSX.Element {
    return PlayerHandView(this);
  }
}

