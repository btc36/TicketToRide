import * as React from "react";
import * as I from "../ViewModels/IMapViewModel";
import GoogleMapReact from 'google-map-react';

export const MapView  = (component: I.IMapViewModel) => {
  const routes = [];
  const routeList = component.state.routeList;
  for (let i = 0; i < routeList.length; i++) {
    routes.push(
      <li key={i}>{routeList[i].city1}, {routeList[i].city2}</li>
    );
  }
  return (
    <div className="view map-view">
      <GoogleMapReact
        bootstrapURLKeys={{ key: component.state.apiKey }}
        defaultCenter={component.state.center}
        defaultZoom={component.state.zoom}>
      </GoogleMapReact>
    </div>
  );
}
