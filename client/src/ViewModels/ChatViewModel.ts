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
  }

  updateMessage = (e: any) => {
    this.setState({"currentMessage": e.target.value});
  }

  render(): JSX.Element {
    return ChatView(this);
  }
}
