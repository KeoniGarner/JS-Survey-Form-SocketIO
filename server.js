const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "./views")));
const server = app.listen(1337);
const io = require('socket.io')(server);
var counter = 0;
    
io.on('connection', function (socket) { 
  
  socket.on('posting_form', function(data) {
    let message = "<p>You emitted the following information to the server:</p><ul>"
    message += `<li>Name: ${data.name}</li>`;
    message += `<li>Location: ${data.location}</li>`;
    message += `<li>Favorite Language: ${data.language}</li>`;
    message += `<li>Comment: ${data.comment}</li>`;
    message += "</ul>";
    io.emit('updated_message', message);
    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    io.emit('random_number', `Your lucky number emitted by the server is: ${randomNumber}`);
  }); 
    
});