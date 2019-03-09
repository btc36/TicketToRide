import * as React from "react";
import * as I from "../ViewModels/IPlayerInfoViewModel";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export const PlayerInfoView  = (component: I.IPlayerInfoViewModel) => {

    const players = new Array<any>();
    const playerList = component.state.playerList;
    const trainInfos = new Array<any>();
    const turn = new Array<any>();
    let colorCountMap;

    for (let i = 0; i < playerList.length; i++) {
        if(component.state.username == playerList[i].username)
            colorCountMap = playerList[i].colorCountMap; // get the card counts of this user

        if(playerList[i].myTurn == true)
        {
          turn.push(
            <li> Turn: {playerList[i].username} </li>
          );
        }
        players.push(
            <li> {playerList[i].username} </li>
            //{playerList[i].numTrainCards} {playerList[i].numDestinationCards}</li>
        );
        players.push(<li> score : {playerList[i].score} </li>);
        players.push(<li> TrainCards : {playerList[i].numTrainCards} </li>);
        players.push(<li> DestinationCards : {playerList[i].numDestinationCards} </li>);
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
                  Train Card Status
                  {trainInfos}
              </ul>

          </div>
          <div>
              <p><b><u>Player Info</u></b></p>
              {turn}
              <ul>
                  {players}
              </ul>
              <p><b>Message</b></p>
          </div>
      </div>
  );
}
