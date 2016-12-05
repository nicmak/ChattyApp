// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid =require('uuid');
// Set the port to 4000
const PORT = 5000;
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

//broadCaster Function...Will send data from server to All clients through forEach Loop, because
// wss.clients is an array...data will be stringified in order to move from server to client.
let broadCaster = (data) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  })
}
//userTracker Function...it will take number of clients as input and store them
// inside an object, which will then be passed into broadCaster function
let userTracker = (clientLength) => {
  let numberObject = {type:"userCount", number:clientLength}
  broadCaster(numberObject)
}

//This is where the connection between client and server occurs
wss.on('connection', (ws) => {
  userTracker(wss.clients.length)

//This is where server is receiving data from clients
  ws.on('message', (data) => {
    data = JSON.parse(data);
    //We are converting the data from string to object, because it would allow
    //us to easily input new keys and values. i.e. type : incomingMessage

    //Switch condition is required inorder to determine whether server is broadcasting
    // either a message or a notification.
    switch (data.type) {
      //This case is broadCasting a message the user wrote
      case "postMessage":
        data.id = uuid //Unique ID is inputted into data object here, this will make every message unique.
        data.type = "incomingMessage" //Here we are converting the data.type from postMessage to incomingMessage
        broadCaster(data);
          break;
      //Case: Server is receiving a notification from client
      case "postNotification":
        data.type = "incomingNotification" //BroadCasting message to clients as "incomingNotification"
        broadCaster(data);
          break;

      default:
        throw new Error("Server:Unknown event type", data.type)
    }
  })
//This is where the connection between client and sever closes, followed by a event function
  ws.on('close', () => {
    userTracker(wss.clients.length)
  });
});
