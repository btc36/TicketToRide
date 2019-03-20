import * as React from "react";
import { FaceUpCardsView } from "../Views/FaceUpCardsView";
import { initialState, State, IFaceUpCardsViewModel } from "./IFaceUpCardsViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import {IStateful} from "./IStateful";

export class FaceUpCardsViewModel extends React.Component<IngameViewModelProps, State> implements IFaceUpCardsViewModel, IObserver, IStateful {

  state: State = initialState;

  componentDidMount() {
    this.setState({ 
      faceUpCards: this.props.services.getFaceUpCards(),
      numDestinationCardsRemaining: this.props.services.getNumDestinationCardsRemaining(),
      numTrainCardsRemaining: this.props.services.getNumTrainCardsRemaining()
    });
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({ "page": data });
    } else if (updateType == "setFaceUpCards") {
      this.setState({ faceUpCards: this.props.services.getFaceUpCards() });
      this.setState({ numTrainCardsRemaining: this.props.services.getNumTrainCardsRemaining()});
    } else if ( updateType == "keptDestination") {
      this.setState({ numDestinationCardsRemaining: this.props.services.getNumDestinationCardsRemaining()});
    }
  }

  drawCard = (e: any) => {
    this.props.services.drawTrainCard();
    this.props.services
  }

  drawFaceUp = (e: any) => {
    
  }

  render(): JSX.Element {
    return FaceUpCardsView(this);
  }

  changeState(): void {
    
  }
}

