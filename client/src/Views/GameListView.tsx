import * as React from "react";
import * as I from "../ViewModels/IGameListViewModel";

export const GameListView = (component: I.IGameListViewModel) => {
  const rows = [];
  const gameList = component.state.gameList.getGames();
  for (let i = 0; i < gameList.length; i++) {
    rows.push(
      <tr onClick={() => component.tableRowPressed(i)} className={component.state.selectedGame == i ? "active" : ""} key={i}>
        <td>{gameList[i].getGameID()}</td>
        <td>{gameList[i].getGameName()}</td>
        <td>{gameList[i].getMaxPlayers()}</td>
        <td>{gameList[i].getNumPlayers()}/{gameList[i].maxPlayers}</td>
      </tr>
    );
  }
  return (
    <div className="view">
      <div className="half-partition">
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Players</th>
              <th>In-Game</th>
            </tr>
            {rows}
          </tbody>
        </table>
        <p>
          <button onClick={component.joinGameButtonPressed} disabled={component.state.selectedGame == -1}>Join Game</button>
        </p>
      </div>
      <div className="half-partition">
        <form onSubmit={component.createGameButtonPressed}>
          <p>
            <label>Name:<br />
              <input type="text" value={component.state.createGameName} onChange={component.onCreateGameNameChange}/>
            </label>
          </p>
          <p>
            <label>Number of players:<br />
              <input type="text" value={component.state.createGameNumPlayers} onChange={component.onCreateGameNumPlayersChange}/>
            </label>
          </p>
          <input type="submit" value="Create Game" className="wide-button" />
        </form>
      </div>
    </div>
  );
}
