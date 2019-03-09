import * as React from "react";
import * as I from "../ViewModels/IFaceUpCardsViewModel";

export const FaceUpCardsView  = (component: I.IFaceUpCardsViewModel) => {
  let faceUpCardsList = [];
  if (component.state.faceUpCards == null) {
    return (
      <p>Loading...</p>
    );
  }
  const cards = component.state.faceUpCards.getCards();
  for (let i = 0; i < cards.length; i++) {
    faceUpCardsList.push(<p key={i}>Train Card: {cards[i].getColor()}</p>);
  }
  return (
    <div>
      <div>
        {faceUpCardsList}
      </div>
      <div className="deck">
        <p>Train Cards Deck</p>
        <p>{component.state.numTrainCardsRemaining} cards remaining.</p>
      </div>
      <div className="deck">
        <p>Destination Cards Deck</p>
        <p>{component.state.numDestinationCardsRemaining} cards remaining.</p>
      </div>
    </div>
  );
}
