import * as React from "react";
import { PlayerHandView } from "../Views/PlayerHandView";
import { initialState, State, IPlayerHandViewModel } from "./IPlayerHandViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class PlayerHandViewModel extends React.Component<ViewModelProps, State> implements IPlayerHandViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return PlayerHandView(this);
  }
}

