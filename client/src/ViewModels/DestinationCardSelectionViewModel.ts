import * as React from "react";
import { DestinationCardSelectionView } from "../Views/DestinationCardSelectionView";
import { initialState, State, IDestinationCardSelectionViewModel } from "./IDestinationCardSelectionViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import { DestinationCard } from "../Models/DestinationCard";

export class DestinationCardSelectionViewModel extends React.Component<IngameViewModelProps, State> implements IDestinationCardSelectionViewModel, IObserver {
  state: State = initialState;
  noCards = [new DestinationCard("City1", "City2", 0), new DestinationCard("City1", "City2", 0), new DestinationCard("City1", "City2", 0)];
  firstTime = true;
  isActive = true;

  componentDidMount() {
    this.setState({ destinationCards: this.props.services.getDestinationCards(), toDiscard: "none"});
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({ "page": data });
    }
    else if (updateType == "discardDestination") {
      this.setState({ destinationCards: this.noCards, toDiscard: "none" });
      this.setState({ isActive: false });
      this.setState({ firstTime: false });
    } else if (updateType == "drawDestination") {
      this.setState({ destinationCards: this.props.services.getDestinationCards(), toDiscard: "none" });
      this.setState({ isActive: true });
    } else if (updateType == "isMyTurn") {
      this.setState({isActive: true})
    }
  }

  render(): JSX.Element {
    return DestinationCardSelectionView(this);
  }

  getMoreCards = (e: any) => {
    console.log("Draw more cards");
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
  }

}

