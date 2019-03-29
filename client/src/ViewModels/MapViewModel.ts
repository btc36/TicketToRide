import * as React from "react";
import { MapView } from "../Views/MapView";
import { Route } from "../Models/Route";
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
    } else if (updateType == "notifyMapClaimedRoutes") {
      this.setState({ ownedRoutes: this.props.services.getAllOwnedRoutes() });
      this.forceUpdate();
    } else if (updateType == "drewTrainCard") {
      this.setState({ canClaimRoute: false });
    } else if (updateType == "drewDestinationCard") {
      this.setState({ canClaimRoute: false });
    } else if (updateType == "isMyTurn") {
      this.setState({ isMyTurn: true });
    } else if (updateType == "endTurn") {
      this.setState({ isMyTurn: false });
      this.setState({ canClaimRoute: true });
    }
  }

  claimRoute(route: Route) {
    if (!this.state.isMyTurn) {
      alert("WAIT YOUR TURN BUDDY");
    } else if (!this.state.canClaimRoute) {
      alert("You can't do that right now.");
    } else {
      this.props.services.claimRoute(route);
    }
  }

  componentDidMount() {
    this.setState({ ownedRoutes: this.props.services.getAllOwnedRoutes() });
  }

  render(): JSX.Element {
    return MapView(this);
  }
}
