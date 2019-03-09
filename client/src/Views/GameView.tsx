import * as React from "react";
import * as I from "../ViewModels/IGameViewModel";
import GoogleMap from 'google-map-react';

export const GameView  = (component: I.IGameViewModel) => { 
  return (
    <div className="GameView">
    	<h3>Player Info</h3><hr/>
    	{component.playerInfoViewModel}

    	<h3>Player Hand</h3><hr/>
		<p>component.playerHandViewModel</p>

    	<h3>Face Up Cards</h3><hr/>
    	<p>component.faceUpCardsViewModel</p>

    	<h3>Destination Cards Selection</h3><hr/>
    	{component.destinationCardSelectionViewModel}

    	<h3>Map</h3><hr/>
    	{component.mapViewModel}
    </div>
  );
}
