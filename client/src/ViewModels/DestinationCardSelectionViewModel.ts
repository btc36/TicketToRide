import * as React from "react";
import { DestinationCardSelectionView } from "../Views/DestinationCardSelectionView";
import { initialState, State, IDestinationCardSelectionViewModel } from "./IDestinationCardSelectionViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class DestinationCardSelectionViewModel extends React.Component<ViewModelProps, State> implements IDestinationCardSelectionViewModel, IObserver {

  state: State = initialState;

  componentDidMount() {
    this.setState({ destinationCards: this.props.services.getDestinationCards() });
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return DestinationCardSelectionView(this);
  }
}

