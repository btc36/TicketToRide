import * as React from "react";
import * as I from "../ViewModels/IGameOverViewModel";

export const GameOverView  = (component: I.IGameOverViewModel) => {
  let scores = [];
  let people = component.state.people;
  for (let i = 0; i < people.length; i++) {
    scores.push(
      <li>
        {people[i].username}: {people[i].score} (Trains: {people[i].numTrains}, DC: {people[i].destinationCardsEarned} - {people[i].destinationCardsLost})
      </li>
    );
  }
  return (
    <div>
      <h2>Game over!</h2>
      <p>Winner: <b>{component.state.winner}</b></p>
      <p>Most routes: <b>{component.state.mostRoutes}</b></p>
      <ul>
        {scores}
      </ul>
    </div>
  );
}

