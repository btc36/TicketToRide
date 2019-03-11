import * as React from "react";
import * as I from "../ViewModels/IPlayerInfoViewModel";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export const PlayerInfoView  = (component: I.IPlayerInfoViewModel) => {

    if (component.state.game == null){
        return (
          <div> Loading...</div>
        )
      }
    const players = new Array<any>();
    const playerList = component.state.game.getPlayerList();
    const trainInfos = new Array<any>();
    const turn = new Array<any>();
    let colorCountMap = null;

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
        players.push(<li> TrainCards : {playerList[i].getNumTrainCards} </li>);
        players.push(<li> DestinationCards : {playerList[i].getDestinationCards} </li>);
    }
    if (colorCountMap) {
      colorCountMap.forEach((value: number, key: string) => {
          trainInfos.push(
              <li>{key} : {value}</li>
          )
      });
    }
  return (
      <div>
          <div>
              <p><b><u>Player Info</u></b></p>
              <p>{turn}</p>
              <ul>
                  {players}
              </ul>
          </div>
      </div>
  );
}
