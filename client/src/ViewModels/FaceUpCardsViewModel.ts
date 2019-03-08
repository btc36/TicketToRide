import * as React from "react";
import { FaceUpCardsView } from "../Views/FaceUpCardsView";
import { initialState, State, IFaceUpCardsViewModel } from "./IFaceUpCardsViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class FaceUpCardsViewModel extends React.Component<IngameViewModelProps, State> implements IFaceUpCardsViewModel, IObserver {

  state: State = initialState;

  componentDidMount() {
    this.setState({ faceUpCards: this.props.services.getFaceUpCards() });
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    } else if (updateType == "setFaceUpCards") {
      this.setState({ faceUpCards: this.props.services.getFaceUpCards() });
    }
  }

  render(): JSX.Element {
    return FaceUpCardsView(this);
  }
}

