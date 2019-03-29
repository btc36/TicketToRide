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
import { PerformingOtherActionState } from "./PerformingOtherActionState";

export class FaceUpCardsViewModel extends React.Component<IngameViewModelProps, State> implements IFaceUpCardsViewModel, IObserver, IStateful {

  state: State = initialState;

  constructor(props) {
    super(props);
    this.drawCard = this.drawCard.bind(this);
    this.drawFaceUp = this.drawFaceUp.bind(this);
    this.changeState = this.changeState.bind(this);
  }

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
    } else if (updateType == "isMyTurn" && (this.state.drawState instanceof DoneDrawingState || this.state.drawState == null)) {
      this.changeState(new NothingSelectedState());
    } else if (updateType == "endTurn") {
      this.changeState(new DoneDrawingState());
    } else if (updateType == "drewDestinationCard") {
      this.changeState(new PerformingOtherActionState());
    }
  }

  getFaceUpCard(index: number): TrainCard {
    let faceUp = this.props.services.getFaceUpCards().faceUpCards;
    return faceUp[index];
  }

  drawCard(e: any) {
    this.state.drawState.drawTrainCard(this,-1);//-1 for mystery card
  }

  drawFaceUp(e: any) {
    this.state.drawState.drawTrainCard(this,this.state.faceUpIndex);//Index of the card selected
  }

  onFaceUpIndexChanged = (e: any) => {
    this.setState({ "faceUpIndex": e.target.value -1 });//Account for 0 based indexing
  }

  getCards(): any {
    let myCards = this.props.services.getFaceUpCards().faceUpCards;
    console.log("MY CARDS");
    console.log(myCards);
    return myCards;
  }

  render(): JSX.Element {
    return FaceUpCardsView(this);
  }

  changeState(newState:DrawTrainCardState): void {
    this.setState({ "drawState": newState });
  }
}

