import * as React from "react";
import * as I from "../ViewModels/IMapViewModel";
import GoogleMap from 'google-map-react';
import { Route } from "../Models/Route";
import { AllRoutes } from "../Models/GameMap";

let invisibleLines = [];
let MAP;
let MAPS;

export const renderDottedPolyline = (map: any, maps: any, currentRoute: Route) =>  {
  let cost = currentRoute.getLength();
  let p1 = I.cityToCoordinates.get(currentRoute.getCities()[0]);
  let p2 = I.cityToCoordinates.get(currentRoute.getCities()[1]);
  let spaceSizeRatio = 0.5;
  let carSizeRatio = 1.00 - spaceSizeRatio;
  spaceSizeRatio = spaceSizeRatio / (cost + 1);
  carSizeRatio = carSizeRatio / cost;
  let deltaLat = p1.lat - p2.lat;
  let deltaLng = p1.lng - p2.lng;
  let incrementerLat = 0;
  let incrementerLng = 0;

  for(let j = 0; j < cost; j++) {
    incrementerLat += (deltaLat * spaceSizeRatio);
    incrementerLng += (deltaLng * spaceSizeRatio);
    let beginTrainCar = {lat: p2.lat + incrementerLat, lng: p2.lng +incrementerLng};
    incrementerLat += (deltaLat * carSizeRatio);
    incrementerLng += (deltaLng * carSizeRatio);
    let endTrainCar = {lat: p2.lat + incrementerLat, lng: p2.lng +incrementerLng};
    let singleCarPath = new maps.Polyline({
      path: [
        beginTrainCar,
        endTrainCar
      ],
      strokeColor: currentRoute.getColor(),
      strokeOpacity: 1,
      strokeWeight: 4
    });
    singleCarPath.setMap(map);
  }
}

export const renderPolylines = (map: any, maps: any, component: I.IMapViewModel) =>  {
  for(let i = 0; i < AllRoutes.length; i++) {
    let currentRoute = AllRoutes[i];
    renderDottedPolyline(map, maps, currentRoute);
    renderRoute(currentRoute, component, 0);
  }
}

export const renderMarkers = (map: any, maps: any, component: I.IMapViewModel) =>  {
  for (var [key, value] of I.cityToCoordinates.entries()) {
    let marker = new maps.Marker({
      position: {
        lat: value.lat,
        lng: value.lng
      },
      icon: 'marker.png',
      map,
      title: key
    });
  }
}

export const renderMapAddons = (map: any, maps: any, component: I.IMapViewModel) => {
  MAP = map;
  MAPS = maps;
  renderPolylines(map, maps, component);
  renderMarkers(map, maps, component);
}

const renderRoute = (route: Route, component: I.IMapViewModel, opacity = 1, color = "red")  => {
  let invisibleClickableLine = new MAPS.Polyline({
    path: [
      I.cityToCoordinates.get(route.getCities()[0]),
      I.cityToCoordinates.get(route.getCities()[1])
    ],
    strokeColor: color,
    strokeOpacity: opacity,
    strokeWeight: 6
  });
  invisibleLines.push(invisibleClickableLine);
  invisibleClickableLine.setMap(MAP);
  MAPS.event.addListener(invisibleClickableLine, 'click', function() {
    component.claimRoute(route);
  });
}

export const MapView  = (component: I.IMapViewModel) => { 
  if (MAP && MAPS && component.state.ownedRoutes) {
    for (let i = 0; i < component.state.ownedRoutes.length; i++) {
      let claimerColor = component.state.ownedRoutes[i][0];
      renderRoute(component.state.ownedRoutes[i][1], component, 1, claimerColor.toString());
    }
  }
  return (
    <div className="view map-view">
      <GoogleMap
        bootstrapURLKeys={{ key: component.state.apiKey }}
        defaultCenter={component.state.center}
        defaultZoom={component.state.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => this.renderMapAddons(map, maps, component)}>
      </GoogleMap>
    </div>
  );
}
