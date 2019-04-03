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
            <h1> Turn: {playerList[i].username} </h1>
          );
        }
        players.push(
            <li><b>Player: {playerList[i].username} </b></li>
            //{playerList[i].numTrainCards} {playerList[i].numDestinationCards}</li>
      );
        players.push(<li>&nbsp;&nbsp;&nbsp;&nbsp;Color: {playerList[i].color} </li>)
        players.push(<li>&nbsp;&nbsp;&nbsp;&nbsp;Score : {playerList[i].score} </li>);
        // players.push(<li> TrainCards : {playerList[i].myHand.trainCards.length} </li>);
        // players.push(<li> DestinationCards : {playerList[i].myHand.destinationCards.length} </li>);
        players.push(<li>&nbsp;&nbsp;&nbsp;&nbsp;TrainCards : {playerList[i].numTrainCards} </li>);
        players.push(<li>&nbsp;&nbsp;&nbsp;&nbsp;DestinationCards : {playerList[i].numDestinationCards} </li>);
        players.push(<li>&nbsp;&nbsp;&nbsp;&nbsp;Remaining Train Cars : {playerList[i].numTrains} </li>);
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
              <p>{turn}</p>
              <ul>
                  {players}
              </ul>
          </div>
          <button onClick={component.refreshInfo}>Refresh</button>
      </div>
  );
}
