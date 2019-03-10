import * as React from "react";
import { ChatView } from "../Views/ChatView";
import { initialState, State, IChatViewModel } from "./IChatViewModel";
import { IObserver } from "./IObserver";
import { IngameViewModelProps } from "./ViewModelProps";
import { PollerChat } from "../Server/PollerChat";

export class ChatViewModel extends React.Component<IngameViewModelProps, State> implements IChatViewModel, IObserver {

  state: State = initialState;
  poller: PollerChat;

  constructor(props: IngameViewModelProps) {
    super(props);
    this.props.services.getChatHistory();
    this.poller = new PollerChat(this.props.services);
    this.poller.start();
  }

  update = (updateType: string, data: any) => {
    if (updateType == "transitionPage") {
      this.props.main.setState({"page": data});      
    }
    else if (updateType == "updateMessageList") {
      this.setState({"messageList": data});
    }
  }

  sendChat = (e: any) => {
    e.preventDefault();
    const msg: string = this.state.currentMessage;
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    this.props.services.SendChatCommand(msg, time);
  }

  updateMessage = (e: any) => {
    this.setState({"currentMessage": e.target.value});
  }

  render(): JSX.Element {
    return ChatView(this);
  }
}
