import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav'
// > var anotherString=stringified.replace('{','"{"id":"1",')
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser:"",
      messages: [],
      userCount:0,
      changeUser:""
    }
  }

  genID = () => {
    return Math.floor(Math.random()*1000)
  }

//nameChange function is used so that on ChatBar, when the username is passed into
//nameChange, the username will be compared with currentUser currently stored in App.jsx state's currentUser:name
    nameChange = (username) => {
    let currentUser = this.state.currentUser
    if (username != currentUser && currentUser != "") {
      let serverMessage = {type:"postNotification",content:`${currentUser} has changed their name to ${username}`}
      this.socket.send(JSON.stringify(serverMessage))
      this.setState({currentUser:username})      // let serverMessage = {type:"postNotification",content:`{currentUser} has changed their name to {username}`}
      // currentUser = username //This would set the state.CurrentUser to the new Userinput
    } else {
        this.setState({currentUser:username})
        console.log("username is the same");
      }
    }


    upAction = (username,content) => {
    let serverMessage = {type:"postMessage",username:username,content:content};
    //Client is sending post message to server now...
    this.socket.send(JSON.stringify(serverMessage));
    // this.socket.onmessage = (event) => {
    //   let objectData = JSON.parse(event.data)
    //   let new2message=this.state.messages.concat(objectData);
    //   this.setState({messages:new2message});
    // }
  }

  render() { //returns HTML that will get displayed in the browser
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <Nav userCounts={this.state.userCount}/>
        <MessageList messages={this.state.messages} changeUser={this.state.changeUser}/>
        <ChatBar nameChange={this.nameChange} currentUser={this.state.currentUser} upAction={this.upAction}/>
      </div>
    );
  }
  componentDidMount() {
      this.socket = new WebSocket("ws://localhost:5000");
      this.socket.onmessage = (event) => {
        let objectData = JSON.parse(event.data)
        switch (objectData.type) {
          case "incomingMessage":
          let new2message = this.state.messages.concat(objectData);
          this.setState({messages:new2message});
            break;
          case "incomingNotification":
          this.setState({changeUser:objectData.content});
            break;
          case "userCount":
          this.setState({userCount:objectData.number})
            break;
          default:
            throw new Error("Server:Unknown event type", data.type)
        }
      }
   }
}
export default App;//This is getting sent to index.jsx
