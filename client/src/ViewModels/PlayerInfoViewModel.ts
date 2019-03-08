import * as React from "react";
import { PlayerInfoView } from "../Views/PlayerInfoView";
import { initialState, State, IPlayerInfoViewModel } from "./IPlayerInfoViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class PlayerInfoViewModel extends React.Component<IngameViewModelProps, State> implements IPlayerInfoViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return PlayerInfoView(this);
  }
}

