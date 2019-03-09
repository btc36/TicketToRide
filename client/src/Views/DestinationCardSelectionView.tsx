import * as React from "react";
import * as I from "../ViewModels/IDestinationCardSelectionViewModel";

export const DestinationCardSelectionView  = (component: I.IDestinationCardSelectionViewModel) => {
  let cards = [];
  let destCards = component.state.destinationCards;
  for (let i = 0; i < destCards.length; i++) {
    let card = destCards[i];
    cards.push(<p key={i}>{card.cityOne} to {card.cityTwo}: {card.pointValue}</p>);
  }
  return (
    <form action="/action_page.php">
      <p>Destination Card A----City1: {component.state.destinationCards[0].cityOne} , City2: {component.state.destinationCards[0].cityTwo}, Points: {component.state.destinationCards[0].pointValue}</p><p>
      </p><p>Destination Card A----City1:  {component.state.destinationCards[1].cityOne} , City2: {component.state.destinationCards[1].cityTwo}, Points: {component.state.destinationCards[1].pointValue}</p><p>
      </p><p>Destination Card A----City1:  {component.state.destinationCards[2].cityOne} , City2: {component.state.destinationCards[2].cityTwo}, Points: {component.state.destinationCards[2].pointValue}</p><p>
        <input type="radio" name="discard" defaultValue="a" /> Discard A<br />
        <input type="radio" name="discard" defaultValue="b" /> Discard B<br />
        <input type="radio" name="discard" defaultValue="c" /> Discard C<br />
        <input type="radio" name="discard" defaultValue="d" /> Keep all 3<br /> <br />
        <input type="submit" defaultValue="Submit" />
      </p></form>
  );
}
