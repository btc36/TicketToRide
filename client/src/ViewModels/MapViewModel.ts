import * as React from "react";
import { MapView } from "../Views/MapView";
import { initialState, State, IMapViewModel } from "./IMapViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";

export class MapViewModel extends React.Component<IngameViewModelProps, State> implements IMapViewModel, IObserver {

  state: State = initialState;
  mapInstance: any;
  cityToCoordinates: any;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    } else if (updateType == "updatedPlayerList") {
      this.setState({ ownedRoutes: this.props.services.getAllOwnedRoutes() });
      this.forceUpdate();
    }
  }

  componentDidMount() {
    this.setState({ ownedRoutes: this.props.services.getAllOwnedRoutes() });
  }

  render(): JSX.Element {
    return MapView(this);
  }
}
