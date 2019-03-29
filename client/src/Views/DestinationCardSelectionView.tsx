import * as React from "react";
import * as I from "../ViewModels/IDestinationCardSelectionViewModel";

export const DestinationCardSelectionView  = (component: I.IDestinationCardSelectionViewModel) => { 
  let cards = [];
  let destCards = component.state.destinationCards;
  for (let i = 0; i < destCards.length; i++) {
    let card = destCards[i];
    cards.push(<p key={i}>{card.city1} to {card.city2}: {card.pointValue}</p>);
  }
  if (component.state.isActive && component.state.firstTime) {
    return (
      <form onSubmit={component.onSubmitButtonPressed}>
        <p>Destination Card A----City1: {component.state.destinationCards[0].city1} , City2: {component.state.destinationCards[0].city2}, Points: {component.state.destinationCards[0].pointValue}</p><p>
        </p><p>Destination Card B----City1:  {component.state.destinationCards[1].city1} , City2: {component.state.destinationCards[1].city2}, Points: {component.state.destinationCards[1].pointValue}</p><p>
        </p><p>Destination Card C----City1:  {component.state.destinationCards[2].city1} , City2: {component.state.destinationCards[2].city2}, Points: {component.state.destinationCards[2].pointValue}</p><p>
          <input type="radio" name="discard" defaultValue="a" onChange={component.onSelectCard} checked={component.state.toDiscard === "a"} /> Discard A<br />
          <input type="radio" name="discard" defaultValue="b" onChange={component.onSelectCard} checked={component.state.toDiscard === "b"} /> Discard B<br />
          <input type="radio" name="discard" defaultValue="c" onChange={component.onSelectCard} checked={component.state.toDiscard === "c"} /> Discard C<br />
          <input type="radio" name="discard" defaultValue="none" onChange={component.onSelectCard} checked={component.state.toDiscard === "none"} /> Keep all 3<br /> <br />
          <input type="submit" defaultValue="Submit" />
        </p></form>
    );
  } else if (component.state.isActive && !component.state.firstTime) {
    return (
    <form onSubmit={component.onSubmitButtonPressed}>
      <p>Destination Card A----City1: {component.state.destinationCards[0].city1} , City2: {component.state.destinationCards[0].city2}, Points: {component.state.destinationCards[0].pointValue}</p><p>
      </p><p>Destination Card B----City1:  {component.state.destinationCards[1].city1} , City2: {component.state.destinationCards[1].city2}, Points: {component.state.destinationCards[1].pointValue}</p><p>
      </p><p>Destination Card C----City1:  {component.state.destinationCards[2].city1} , City2: {component.state.destinationCards[2].city2}, Points: {component.state.destinationCards[2].pointValue}</p><p>
        <input type="radio" name="discard" defaultValue="a" onChange={component.onSelectCard} checked={component.state.toDiscard === "a"} /> Discard A<br />
        <input type="radio" name="discard" defaultValue="b" onChange={component.onSelectCard} checked={component.state.toDiscard === "b"} /> Discard B<br />
        <input type="radio" name="discard" defaultValue="c" onChange={component.onSelectCard} checked={component.state.toDiscard === "c"} /> Discard C<br />
        <input type="radio" name="discard" defaultValue="d" onChange={component.onSelectCard} checked={component.state.toDiscard === "d"} /> Discard A and B<br />
        <input type="radio" name="discard" defaultValue="e" onChange={component.onSelectCard} checked={component.state.toDiscard === "e"} /> Discard A and C<br />
        <input type="radio" name="discard" defaultValue="f" onChange={component.onSelectCard} checked={component.state.toDiscard === "f"} /> Discard B and C<br />
        <input type="radio" name="discard" defaultValue="none" onChange={component.onSelectCard} checked={component.state.toDiscard === "none"} /> Keep all 3<br /> <br />
        <input type="submit" defaultValue="Submit" />
      </p></form >
     );
  } else {
    return (
      <form>
      <p>Cards have been Selected!</p>
        <button onClick={component.getMoreCards} type="submit">Get More Destination Cards</button>
        </form>
    );
  }
  
}
