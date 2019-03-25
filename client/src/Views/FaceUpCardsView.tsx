import * as React from "react";
import * as I from "../ViewModels/IFaceUpCardsViewModel";

export const FaceUpCardsView  = (component: I.IFaceUpCardsViewModel) => {
  let faceUpCardsList = [];
  if (component.state.faceUpCards == null) {
    return (
      <p>Loading...</p>
    );
  }
  const cards = component.getCards();
  for (let i = 0; i < cards.length; i++) {
    faceUpCardsList.push(<p key={i}>Train Card: {cards[i].color}</p>);
  }
  return (
    <div>
      <div>
        {faceUpCardsList}
        <input type="number" name="quantity" defaultValue="1" min="1" max="5" onChange={component.onFaceUpIndexChanged}></input>
        <button onClick={component.drawFaceUp} type="submit">Draw Faceup</button>
        <button onClick={component.drawCard} type="submit">Draw Mystery Card</button>
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
