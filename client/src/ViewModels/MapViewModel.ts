import * as React from "react";
import { MapView } from "../Views/MapView";
import { Route } from "../Models/Route";
import { initialState, State, IMapViewModel } from "./IMapViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import { MapPoller } from "../Server/MapPoller";

export class MapViewModel extends React.Component<IngameViewModelProps, State> implements IMapViewModel, IObserver {

  state: State = initialState;
  poller: MapPoller;
  mapInstance: any;
  cityToCoordinates: any;

  constructor(props) {
    super(props);
    this.poller = new MapPoller(this.props.services);
    this.poller.start();
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    } else if (updateType == "notifyMapClaimedRoutes") {
      this.setState({ ownedRoutes: this.props.services.getAllClaimedRoutes() });
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
    } else if (!this.hasClaimedDestination()) {
      alert("Please select destination cards first");
    }
    else {
      this.props.services.claimRoute(route);
    }
  }

  hasClaimedDestination(): boolean {
    let playerHand = this.props.services.getPlayerHand();
    let destinationCards = playerHand.getDestinationCards();
    let numDestinationCards = destinationCards.length;
    if (numDestinationCards > 0) {
      return true;
    } else {
      return false;
    }

  }

  componentDidMount() {
    this.setState({ ownedRoutes: this.props.services.getAllOwnedRoutes() });
  }

  render(): JSX.Element {
    return MapView(this);
  }
}
