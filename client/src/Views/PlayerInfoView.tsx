import * as React from "react";
import * as I from "../ViewModels/IPlayerInfoViewModel";

export const PlayerInfoView  = (component: I.IPlayerInfoViewModel) => {

    const players = new Array<any>();
    const playerList = component.state.playerList
    const cards = new Array<any>();
    let cardList;
    let turn = false;
    for (let i = 0; i < playerList.length; i++) {
        if(component.state.username == playerList[i].username)
        {
            turn = playerList[i].myTurn;
        }
        players.push(
            <li>{playerList[i].username} : {playerList[i].score} {playerList[i].numTrainCards} {playerList[i].numDestinationCards}</li>
        //numTrainCards: number;
        //numDestinationCards: number;
        );
    }
  return (
      <div>
          <div>
              <p><b><u>My Info</u></b></p>
              <ul>
                  Myturn : {turn}
              </ul>

          </div>
          <div>
              <p><b><u>Player Info</u></b></p>
              <ul>
                  {players}
              </ul>
              <p><b>Message</b></p>
          </div>
      </div>
  );
}
