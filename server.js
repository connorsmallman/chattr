const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => 
  res.sendFile(__dirname + '/public/index.html'));

io.on('connection', socket => {
  socket.on('command', payload => {
    switch(payload.command) {
      case 'nick': 
        socket.broadcast.emit('set_nickname', payload.nickname);
        break;
      case 'think':
        io.emit('think_message', payload.messageId);
        break;
      case 'oops':
        io.emit('delete_message', payload.messageId);
        break;
      default:
        // do nothing 
    }
  });

  socket.on('publish_message', payload => {
    io.emit('broadcast_message', payload);
  });

  socket.on('disconnect', () => {
    // handle disconnection
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});