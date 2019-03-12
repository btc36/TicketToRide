import * as React from "react";
import * as I from "../ViewModels/IPlayerHandViewModel";

export const PlayerHandView  = (component: I.IPlayerHandViewModel) => {
  let destCardsList = new Array<any>();
  let trainCardsList = new Array<any>();

  if (component.state.playerHand == null){
    return (
      <div> Loading...</div>
    )
  }

  const destCards = component.state.playerHand.getDestinationCards();
  const trainCards = component.state.playerHand.getColorMap();
    console.log(trainCards);
  trainCards.forEach((value: number, key: string) => {
    trainCardsList.push(
        <li>{key} : {value}</li>
    )
  });
  console.log(destCards);
  for (let i = 0; i < destCards.length; i++) {
    destCardsList.push(<li>Cities: {destCards[i].getCities()} Points: {destCards[i].getPointValue()}</li>);
  }
  
  
  return (
    <div>
      <div>
        <p><b><u>Destination Cards</u></b></p>
             <ul>
                  {destCardsList}
             </ul>
      </div>
      <div>
          <p><b><u>Train Cards</u></b></p>
              <ul>
                  {trainCardsList}
              </ul>
      </div>
      <button onClick={component.refreshHand}>Refresh</button>
    </div>
  );
}
