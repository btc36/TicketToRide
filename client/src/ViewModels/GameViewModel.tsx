import * as React from "react";
import { initialState, State, IGameViewModel } from "./IGameViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";
import { GameView } from "../Views/GameView";
import { MapViewModel } from './MapViewModel';
import { DestinationCardSelectionViewModel } from './DestinationCardSelectionViewModel';
import { FaceUpCardsViewModel } from './FaceUpCardsViewModel';
import { PlayerHandViewModel } from './PlayerHandViewModel';
import { PlayerInfoViewModel } from './PlayerInfoViewModel';
import { ChatViewModel } from './ChatViewModel';

export class GameViewModel extends React.Component<any, State> implements IGameViewModel, IObserver {

  state: State = initialState;

  mapViewModel: JSX.Element = <MapViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.services} />;
  destinationCardSelectionViewModel: JSX.Element = <DestinationCardSelectionViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;
  faceUpCardsViewModel: JSX.Element = <FaceUpCardsViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;
  playerHandViewModel: JSX.Element = <PlayerHandViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;
  playerInfoViewModel: JSX.Element = <PlayerInfoViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;
  chatViewModel: JSX.Element = <ChatViewModel ref={(instance: any) => this.props.ingameRoot.attach(instance)} main={this} services={this.props.ingameServices} />;

  constructor(props) {
    super(props);
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  render(): JSX.Element {
    return GameView(this);
  }
}
