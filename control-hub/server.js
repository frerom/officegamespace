var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve( __dirname + '/../console/index.html'));
});

var gameConsole;
var setConsole = function (socket) {
  gameConsole = socket;
};

var addController = function (socket) {
  socket.on('input', function (input) {
    console.log('input ' + input + ' recieved');
    gameConsole.emit('input', input);
  });
};

io.on('connect', function (socket) {
  socket.on('i am a', function (type) {
    console.log(type, 'connected');
    switch (type) {
      case 'controller': addController(socket); break;
      case 'console': setConsole(socket); break;
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});