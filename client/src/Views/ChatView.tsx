import * as React from "react";
import * as I from "../ViewModels/IChatViewModel";

export const ChatView  = (component: I.IChatViewModel) => {
  const messages = new Array<any>();
  const messageList = component.state.messageList;
  for (let i = 0; i < messageList.length; i++) {
    messages.unshift(
      <li key={i}>{messageList[i].playerName} : {messageList[i].message}</li>
    );
  }
  return (
    <div>
      <div>
        <p><b><u>Messages</u></b></p>
        <ul className="chat-ul">
          {messages}
        </ul>
        <p><b>Message</b></p>
        <textarea placeholder="Type message.." id="noter-text-area" name="textarea" value={component.state.currentMessage} onChange={component.updateMessage} />
        <button onClick={component.sendChat} disabled={component.state.currentMessage.length <= 0} type="submit">Send</button>
      </div>
    </div>
  );
}
