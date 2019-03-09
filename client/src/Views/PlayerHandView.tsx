import * as React from "react";
import * as I from "../ViewModels/IPlayerHandViewModel";

export const PlayerHandView  = (component: I.IPlayerHandViewModel) => {
  let destCardsList = [];
  let trainCardsList = [];
  if (component.state.playerHand == null) {
    return (
      <p>Loading...</p>
    );
  }
  const destCards = component.state.playerHand.getDestinationCards();
  const trainCards = component.state.playerHand.getColorMap();
  trainCards.forEach((value: number, key: string) => {
    trainCardsList.push(<p>Color : {key} Amount: {value}</p>);
  });
  for (let i = 0; i < destCards.length; i++) {
    destCardsList.push(<p>Cities =  {destCards[i].getCities()} Points = {destCards[i].getPointValue()}</p>);
  }
  
  
  return (
    <div>
      <div>
        <p>Destination Cards:</p>
        {destCardsList}
      </div>
      <div>
      <p>Train Cards:</p>
        {trainCardsList}
      </div>
    </div>
  );
}
