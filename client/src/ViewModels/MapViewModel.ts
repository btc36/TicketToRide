import * as React from "react";
import { MapView } from "../Views/MapView";
import { initialState, State, IMapViewModel } from "./IMapViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";

export class MapViewModel extends React.Component<ViewModelProps, State> implements IMapViewModel, IObserver {

  state: State = initialState;
  mapInstance: any;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return MapView(this);
  }
}
