var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/console/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../console/dist/' + (req.params[0] || 'index.html')));
});
app.get('/console', function (req, res) {
  res.redirect('/console/')
});

app.get('/controller/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../control/dist/' + (req.params[0] || 'index.html')));
});
app.get('/controller', function (req, res) {
  res.redirect('/controller/')
});

var gameConsole;
var setConsole = function (socket) {
  gameConsole = socket;
};

var createPlayerColor = function (players) {
  var colors = ['blue', 'red', 'yellow', 'green', 'purple', 'brown', 'pink', 'orange']
  var unUsedColors = colors.filter(function (color) { return players.indexOf(color) === -1 })
  return unUsedColors[0];
};

var players = [];
var addPlayer = function (socket) {
  var playerColor = createPlayerColor(players);
  players.push(playerColor);

  gameConsole.emit('player connected', playerColor);

  socket.on('input', function (input) {
    console.log(playerColor + ': ' + input);
    gameConsole.emit('input', {
      input: input,
      color: playerColor
    });
  });
};

io.on('connect', function (socket) {
  socket.on('i am a', function (type) {
    console.log(type, 'connected');
    switch (type) {
      case 'controller': addPlayer(socket); break;
      case 'console': setConsole(socket); break;
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});