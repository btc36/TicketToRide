import * as React from "react";
import * as I from "../ViewModels/IDestinationCardSelectionViewModel";

export const DestinationCardSelectionView  = (component: I.IDestinationCardSelectionViewModel) => {
  let cards = [];
  let destCards = component.state.destinationCards;
  for (let i = 0; i < destCards.length; i++) {
    let card = destCards[i];
    cards.push(<p key={i}>{card.route.cityOne} to {card.route.cityTwo}: {card.pointValue}</p>);
  }
  return (
    <div>
      {cards}
    </div>
  );
}
