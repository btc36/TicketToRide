import * as React from "react";
import { FaceUpCardsView } from "../Views/FaceUpCardsView";
import { initialState, State, IFaceUpCardsViewModel } from "./IFaceUpCardsViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import {IStateful} from "./IStateful";
import { DoneDrawingState } from "./DoneDrawingState";
import { TrainCard } from "../Models/TrainCard";
import { DrawTrainCardState } from "./DrawTrainCardState";
import { NothingSelectedState } from "./NothingSelectedState";
import { FaceUpCards } from "../Models/FaceUpCards";

export class FaceUpCardsViewModel extends React.Component<IngameViewModelProps, State> implements IFaceUpCardsViewModel, IObserver, IStateful {

  state: State = initialState;
  statePatternState = new DoneDrawingState();

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
      this.setState({ numTrainCardsRemaining: this.props.services.getNumTrainCardsRemaining() });
    } else if (updateType == "keptDestination") {
      this.setState({ numDestinationCardsRemaining: this.props.services.getNumDestinationCardsRemaining() });
    } else if (updateType == "isMyTurn") {
      this.changeState(new NothingSelectedState());
    }
  }

  getFaceUpCard(index: number): TrainCard {
    let faceUp = this.props.services.getFaceUpCards().faceUpCards;
    return faceUp[index];
  }

  drawCard = (e: any) => {
    this.statePatternState.drawTrainCard(this,-1);//-1 for mystery card
  }

  drawFaceUp = (e: any,) => {
    this.statePatternState.drawTrainCard(this,this.state.faceUpIndex);//Index of the card selected
  }

  onFaceUpIndexChanged = (e: any) => {
    this.setState({ "faceUpIndex": e.target.value -1 });//Account for 0 based indexing
  }

  getCards(): any {
    let myCards = this.props.services.getFaceUpCards().faceUpCards;
    console.log("MY CARDS");
    return myCards;
  }

  render(): JSX.Element {
    return FaceUpCardsView(this);
  }

  changeState(newState:DrawTrainCardState): void {
    this.statePatternState = newState;
  }
}

