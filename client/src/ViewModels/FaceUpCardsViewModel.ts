import * as React from "react";
import { FaceUpCardsView } from "../Views/FaceUpCardsView";
import { initialState, State, IFaceUpCardsViewModel } from "./IFaceUpCardsViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class FaceUpCardsViewModel extends React.Component<ViewModelProps, State> implements IFaceUpCardsViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return FaceUpCardsView(this);
  }
}

