import * as React from "react";
import * as I from "../ViewModels/IGameViewModel";
import GoogleMap from 'google-map-react';

export const GameView  = (component: I.IGameViewModel) => { 
  return (
    <div className="GameView row-view">
      <div className="view">
        <div className="chunk">
          <div className="space-row">
            <h3>Map</h3>
            <button onClick={component.onClickRandomize}>Randomize</button>
          </div>
          <hr/>
          {component.mapViewModel}
        </div>

        <div className="chunk">
          <h3>Chat</h3><hr/>
          {component.chatViewModel}
        </div>
      </div>
      <div className="view">
        <div className="chunk">
          <h3>Player Info</h3><hr/>
          {component.playerInfoViewModel}
        </div>

        <div className="chunk">
          <h3>Player Hand</h3><hr/>
          {component.playerHandViewModel}
        </div>

        <div className="chunk">
          <h3>Face Up Cards</h3><hr/>
          {component.faceUpCardsViewModel}
        </div>

        <div className="chunk">
          <h3>Destination Cards Selection</h3><hr/>
          {component.destinationCardSelectionViewModel}
        </div>
      </div>
    </div>
  );
}
