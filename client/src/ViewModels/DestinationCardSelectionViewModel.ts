import * as React from "react";
import { DestinationCardSelectionView } from "../Views/DestinationCardSelectionView";
import { initialState, State, IDestinationCardSelectionViewModel } from "./IDestinationCardSelectionViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class DestinationCardSelectionViewModel extends React.Component<ViewModelProps, State> implements IDestinationCardSelectionViewModel, IObserver {

  state: State = initialState;


  componentDidMount() {
    this.setState({ destinationCards: this.props.services.getDestinationCards(), toDiscard: "none"});
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return DestinationCardSelectionView(this);
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

      this.props.services.g

    } else if (this.state.toDiscard == "b") {

     // this.props.services.register(this.state.registerUserName, this.state.registerPassword);

    } else if (this.state.toDiscard == "c") {

      //this.props.services.register(this.state.registerUserName, this.state.registerPassword);

    } else if (this.state.toDiscard == "none") {

     //this.props.services.register(this.state.registerUserName, this.state.registerPassword);

    }
  }

}

