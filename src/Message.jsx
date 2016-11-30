import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <div className="username">{this.props.message.username}</div>
        <div className="content">{this.props.message.content}</div>
      </div>
    );
  }
}
export default Message;
