const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v4');

app.get('/', (req, res) => 
  res.sendFile(__dirname + '/dist/index.html'));

app.use(express.static(process.cwd() + '/dist'));

io.on('connection', socket => {
  socket.on('activity', payload => {
    const data = JSON.parse(payload);

    socket.broadcast.emit('message', JSON.stringify({
      event: 'set_participant_typing',
      data: {
        isTyping: data.isTyping
      }
    }));
  });

  socket.on('message', payload => {
    const data = JSON.parse(payload);

    const commands = data.message.match(/\/(\w+)/ig) || [];
    const message = commands.length ? data.message.substr(data.message.indexOf(' ') + 1) : data.message;
    const isOwner = socket.id === data.userId;

    switch(commands[0]) {
      case '/nick': 
        socket.broadcast.emit('message', JSON.stringify({ 
          event: 'set_nickname', 
          data: {
            nickname: message
          }
        }));
        break;
      case '/oops':
        io.emit('message', JSON.stringify({
          event: 'delete_message'
        }));
        break;
      case '/think': 
        io.emit('message', JSON.stringify({ 
          event: 'new_message', 
          data: { 
            isOwner, 
            message,
            think: true
          }
        }));
        break;
      case '/fadelast':
        io.emit('message', JSON.stringify({
          event: 'fade_message'
        }));
        break;
      default:
        io.emit('message', JSON.stringify({ 
          event: 'new_message', 
          data: { 
            isOwner,
            message,
            think: false
          }
        }));
        break;
    }
    
  });

  socket.on('disconnect', () => {
    // handle disconnection
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});