  import React, {Component} from 'react'; //this making react.component
import Message from './Message.jsx';
class MessageList extends Component {  //React.component.MessageList
  render() { //returns HTML that will get displayed in the browser
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        <div className="message system">
          {this.props.changeUser}
        </div>
        {

          this.props.messages.map((message)=> {
            return (
              <Message
                key={message.id}
                message={message}
                userStatement={this.props.changeUser}
              />
            )
          })
        }
      </div>
    );










  }
}
export default MessageList;//This is getting sent to index.jsx
