import * as React from "react";
import { DestinationCardSelectionView } from "../Views/DestinationCardSelectionView";
import { initialState, State, IDestinationCardSelectionViewModel } from "./IDestinationCardSelectionViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import { DestinationCard } from "../Models/DestinationCard";

export class DestinationCardSelectionViewModel extends React.Component<IngameViewModelProps, State> implements IDestinationCardSelectionViewModel, IObserver {
  state: State = initialState;
  noCards = [new DestinationCard("City1", "City2", 0), new DestinationCard("City1", "City2", 0), new DestinationCard("City1", "City2", 0)];


  componentDidMount() {
    this.setState({ destinationCards: this.props.services.getDestinationCards(), toDiscard: "none"});
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({ "page": data });
    }
    else if (updateType == "discardDestination") {
      this.setState({ destinationCards: this.noCards, toDiscard: "none" });
      this.setState({isActive: false });
      this.setState({firstTime: false });
    } else if (updateType == "drawDestination") {
      console.log("DRAW DESTINATION MAN")
      this.setState({ destinationCards: this.props.services.getDestinationCards(), toDiscard: "none" });
      this.setState({ isActive: true });
    } else if (updateType == "isMyTurn") {
      this.setState({ isMyTurn: true });
      /*console.log("BOOLEAN STATS");
      console.log("FIRST TIME");
      console.log(this.state.firstTime);
      console.log("IS ACTIVE");
      console.log(this.state.isActive);
      console.log("IS MY TURN");
      console.log(this.state.isMyTurn);
      console.log("CAN DRAW CARDS");
      console.log(this.state.canDrawCards);*/
    } else if (updateType == "endTurn") {
      this.setState({ isMyTurn: false });
      this.setState({ canDrawCards: true });
    } else if (updateType == "drewTrainCard") {
      console.log("DREW TRAIN CARD");
      this.setState({ canDrawCards: false });
    }
  }

  render(): JSX.Element {
    return DestinationCardSelectionView(this);
  }

  getMoreCards = (e: any) => {
    e.preventDefault();
    if (!this.state.isMyTurn) {
      alert("It's not your turn!");
      return;
    }
    console.log("Draw more cards");
    if (this.state.canDrawCards) {
      this.props.services.clickedDestinationButton();
      this.props.services.getMoreDestinationCards();
    } else {
      alert("You can't do that right now");
    }  
  }

  onSelectCard = (e: any) => {
    this.setState({ "toDiscard": e.target.value });
    console.log("MY SELECTION IS NOW.....");
    console.log(this.state.toDiscard);
  }

  onSubmitButtonPressed = (e: any) => {
    e.preventDefault();
    console.log("I DECIDED TO DISCARD CARD: ");
    console.log(this.state.toDiscard);
    if (this.state.toDiscard == "a") {
      this.props.services.storeDestinationCard([this.state.destinationCards[1], this.state.destinationCards[2]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[0]]);
      this.props.services.printRoot();

    } else if (this.state.toDiscard == "b") {
      this.props.services.storeDestinationCard([this.state.destinationCards[0], this.state.destinationCards[2]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[1]])
      this.props.services.printRoot();

    } else if (this.state.toDiscard == "c") {
      this.props.services.storeDestinationCard([this.state.destinationCards[0], this.state.destinationCards[1]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[2]])
      this.props.services.printRoot();

    } else if (this.state.toDiscard == "none") {
      this.props.services.storeDestinationCard([this.state.destinationCards[0], this.state.destinationCards[1], this.state.destinationCards[2]]);
      this.props.services.DiscardDestinationCard([])
      this.props.services.printRoot();
    } else if (this.state.toDiscard == "d") {//AB
      this.props.services.storeDestinationCard([this.state.destinationCards[2]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[0], this.state.destinationCards[1]])
      this.props.services.printRoot();
    }
    else if (this.state.toDiscard == "e") {//AC
      this.props.services.storeDestinationCard([this.state.destinationCards[1]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[0], this.state.destinationCards[2]])
      this.props.services.printRoot();
    }
    else if (this.state.toDiscard == "f") {//BC
      this.props.services.storeDestinationCard([this.state.destinationCards[1], this.state.destinationCards[2]]);
      this.props.services.DiscardDestinationCard([this.state.destinationCards[0]])
      this.props.services.printRoot();
    }
    if (!this.state.firstTime) {
      this.props.services.endTurn();
    }
    this.setState({ firstTime: false });
  }

}

