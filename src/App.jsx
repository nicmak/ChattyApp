import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav'
// > var anotherString=stringified.replace('{','"{"id":"1",')
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    }
  }

  genID = () => {
    return Math.floor(Math.random()*1000)
  }
  upContent = (username,content) => {
    let serverMessage = {username:username,content:content};
    this.socket.send(JSON.stringify(serverMessage));
    this.socket.onmessage = (event) => {
      console.log("Message received");
      let objectData = JSON.parse(event.data)
      let new2message=this.state.messages.concat(objectData);
      this.setState({messages:new2message});
    }
  }
  render() { //returns HTML that will get displayed in the browser
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <Nav />
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} upAction={this.upContent}/>
      </div>
    );
  }
  componentDidMount() {
    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there, I AM THE ONE WHO ATE THE MARBLES....!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      this.socket = new WebSocket("ws://localhost:5000");
    }, 1000);
  }
}
export default App;//This is getting sent to index.jsx
