import React, {Component} from 'react';

class ChatBar extends Component {
constructor(props) {
  super(props);
  this.state = {value:{username:"",
                       content:""}
               }

this.handleNameChange = this.handleNameChange.bind(this);
}

handleNameChange = (event) => {
  // console.log('handleNameChange', event.target.value);
  this.setState({value: {username: event.target.value, content: this.state.value.content}});
}

handleContentChange = (event) => {
  // console.log('handleContentChange', event.target.value);
  this.setState({value: {username: this.state.value.username, content: event.target.value}});
}

handleSubmit = (event) => {
  if (event.key == "Enter"){
    console.log("Handlesubmit Event target",event.target);
    this.props.upAction(this.state.value.username,this.state.value.content)
    this.props.nameChange(this.state.value.username)
    //Sends username and content into server and stores into App's State
    // this.props.nameChange(this.state.value.username);
    event.preventDefault();
  }
}
  render() { //returns HTML that will get displayed in the browser
    const { currentUser } = this.props;
    return (
      <footer>
        <form onKeyDown={this.handleSubmit} >
          <input
            id="username"
            value={this.state.value.username}
            onChange={this.handleNameChange}
            type="text"
            placeholder="Enter Username"
          />
          <input
            id="new-message"
            value={this.state.value.content}
            onChange={this.handleContentChange}
            type="text"
            placeholder="Type a message and hit ENTER" />
          </form>
      </footer>
    );
  }
}
export default ChatBar;//This is getting sent to index.jsx
