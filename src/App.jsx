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
      messages: [],
      userCount:0,
    }
  }

  genID = () => {
    return Math.floor(Math.random()*1000)
  }

  upContent = (username,content) => {
    let serverMessage = {type:"postMessage",username:username,content:content};
    this.socket.send(JSON.stringify(serverMessage));
    this.socket.onmessage = (event) => {
      let objectData = JSON.parse(event.data)
      let new2message=this.state.messages.concat(objectData);
      this.setState({messages:new2message});
    }
  }

  render() { //returns HTML that will get displayed in the browser
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <Nav userCounts={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} upAction={this.upContent}/>
      </div>
    );
  }
  componentDidMount() {
    setTimeout(() => {
      this.socket = new WebSocket("ws://localhost:5000");
      this.socket.onmessage = (event) => {
        let userNumber = Number(event.data)
        this.setState({userCount:userNumber})
      }
      console.log("Server connection established");
    }, 1000);
  }
}
export default App;//This is getting sent to index.jsx
