import React, {Component} from "react";

class MessageListItem extends Component {
  render(){
    return(
      <div>
        <strong>{this.props.message.sender.name}</strong>
        <p>{this.props.message.text}</p>
      </div>
    )
  }
}

export default MessageListItem;
