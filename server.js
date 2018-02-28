const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v4');

app.get('/', (req, res) => 
  res.sendFile(__dirname + '/dist/index.html'));

app.use(express.static(process.cwd() + '/dist'));

io.on('connection', socket => {
  socket.on('message', payload => {
    const data = JSON.parse(payload);

    switch(data.command) {
      case '/nick': 
        socket.broadcast.emit('message', JSON.stringify({ 
          event: 'set_nickname', 
          data: {
            nickname: data.message
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
            id: uuid(), 
            message: data.message,
            think: true
          }
        }));
        break;
      default:
        io.emit('message', JSON.stringify({ 
          event: 'new_message', 
          data: { 
            id: uuid(), 
            message: data.message,
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