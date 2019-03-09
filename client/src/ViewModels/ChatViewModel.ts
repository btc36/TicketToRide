import * as React from "react";
import { ChatView } from "../Views/ChatView";
import { initialState, State, IChatViewModel } from "./IChatViewModel";
import { IObserver } from "./IObserver";
import { ViewModelProps } from "./ViewModelProps";
import { Poller } from "../Server/Poller";

export class ChatViewModel extends React.Component<ViewModelProps, State> implements IChatViewModel, IObserver {

  state: State = initialState;

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
  }

  sendChat = (e: any) => {
    e.preventDefault();
    //call facade.sendchat
    alert("sending chat");
    const msg: string = this.state.currentMessage;
    var today = new Date();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const username: string = "user1";
    const gameId: string = "game1";

    this.props.services.SendChatCommand(msg, today, username, gameId);
  }

  updateMessage = (e: any) => {
    this.setState({"currentMessage": e.target.value});
  }

  render(): JSX.Element {
    return ChatView(this);
  }
}
