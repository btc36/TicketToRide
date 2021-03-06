import * as React from "react";
import { PlayerHandView } from "../Views/PlayerHandView";
import { initialState, State, IPlayerHandViewModel } from "./IPlayerHandViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class PlayerHandViewModel extends React.Component<IngameViewModelProps, State> implements IPlayerHandViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({ "page": data });
    } else if (updateType == "myHandUpdated") {
      //console.log(this.props.services.getPlayerHand());
      this.setState({ playerHand: this.props.services.getPlayerHand() });
    }
  }

  componentDidMount() {
    this.setState({ playerHand: this.props.services.getPlayerHand() });
  }

  refreshHand = (e: any) => {
    this.setState({ playerHand: this.props.services.getPlayerHand() });
  }

  selectPreferredCard = (e: any) => {
    let color = e.target.id;
    this.props.services.setPreferredColor(color); //sets preferredColor in the ingameClientRoot
    this.setState({ preferredColor: color }); //sets preferredColor in this / IPlayerHandViewModel
  }

  render(): JSX.Element {
    return PlayerHandView(this);
  }
}

