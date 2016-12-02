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


// const broadcast = (data) => {
//     wss.clients.forEach((client) => {
//       client.send(data);
//     });
//   };


// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let userinitialNumber = wss.clients.length
  let numberObject = {type:"userCount", number:userinitialNumber}
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(numberObject));
  })
  ws.on('message', (data) => {
    data = JSON.parse(data);
    switch (data.type) {
      case "postMessage":
      data.id = uuid()
      data.type = "incomingMessage"
      wss.clients.forEach((client) => {
        console.log("Sending incomingMessage to client");
        client.send(JSON.stringify(data));
      });
        break;
      case "postNotification":
      data.type = "incomingNotification"
      wss.clients.forEach((client) => {
        console.log("Sending incomingNotification to client");
        client.send(JSON.stringify(data));

      });
        break;
        default:
          throw new Error("Server:Unknown event type", data.type)
    }
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    let userFinalNumber = wss.clients.length.toString();
    wss.clients.forEach((client) => {
      client.send(userFinalNumber);
    });
  });
});
