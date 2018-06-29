import React, {Component} from "react";

import MessageListItem from "./messageListItem";

class MessageList extends Component{
  render(){

    const renderMessages = this.props.messages.map(message => {
      return(
        <div key={message.id}>
          <MessageListItem message={message} />
        </div>
      )
    })

    return(
      <div>
        {renderMessages}
      </div>
    )
  }
}

export default MessageList;
