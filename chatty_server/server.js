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
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    data = JSON.parse(data);
    data.id=uuid()
    let stringified = JSON.stringify(data);

    wss.clients.forEach((client) => {
      console.log("Sending Stuff to client");
      client.send(stringified);
    });
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
