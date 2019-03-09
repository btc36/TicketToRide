import * as React from "react";
import * as I from "../ViewModels/IPlayerInfoViewModel";

export const PlayerInfoView  = (component: I.IPlayerInfoViewModel) => {

    const players = new Array<any>();
    const playerList = component.state.playerList;
    const trainInfos = new Array<any>();
    let colorCountMap;

    let turn = false;
    for (let i = 0; i < playerList.length; i++) {
        if(component.state.username == playerList[i].username)
        {
            turn = playerList[i].myTurn;
            colorCountMap = playerList[i].colorCountMap;
        }
        players.push(
            <li>{playerList[i].username} : {playerList[i].score} {playerList[i].numTrainCards} {playerList[i].numDestinationCards}</li>
        );
    }
    colorCountMap.forEach((value: number, key: string) => {
        trainInfos.push(
            <li>{key} : {value}</li>
        )
    });
  return (
      <div>
          <div>
              <p><b><u>My Info</u></b></p>
              <ul>
                  Myturn : {turn}
                  Train Card Status
                  {trainInfos}
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
