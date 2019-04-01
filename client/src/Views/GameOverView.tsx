import * as React from "react";
import * as I from "../ViewModels/IGameOverViewModel";

export const GameOverView  = (component: I.IGameOverViewModel) => {
  let scores = [];
  let longestPeople = [];
  // const longest = new Array<any>();
  let people = component.state.people;
  let longest = component.state.longestPaths;
  for (let i = 0; i < people.length; i++) {
    scores.push(
      <li>
        {people[i].username}: {people[i].score} (Trains: {people[i].numTrains}, DC: {people[i].destinationCardsEarned} - {people[i].destinationCardsLost})
      </li>
    );
  }

  for (let i = 0; i < longest.length; i++) {
    longestPeople.push(
      <li>
        {longest[i].username}
      </li>);
  }
  return (
    <div>
      <h2>Game over!</h2>
      <p>Winner: <b>{component.state.winner.username}</b></p>
      <p>Longest Paths: <b>{component.state.mostRoutes.username}</b></p>
      <ul>
        {scores}
      </ul>
    </div>
  );
}

