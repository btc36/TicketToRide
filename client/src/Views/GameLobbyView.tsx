import * as React from "react";
import * as I from "../ViewModels/IGameLobbyViewModel";

export const GameLobbyView  = (component: I.IGameLobbyViewModel) => {
  const players = [];
  const playerList = component.state.playerList;
  for (let i = 0; i < playerList.length; i++) {
    players.push(
      <li>{playerList[i]}</li>
    );
  }
  return (
    <div className="view">
      <div className="half-partition">
        <p><b><u>Players</u></b></p>
        <ul>
          {players}
        </ul>
        <p><button onClick={component.startGameButtonPressed} disabled={playerList.length < 2}>Start Game</button></p>
      </div>
    </div>
  );
}
