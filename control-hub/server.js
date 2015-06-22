var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var ip = require('ip');
var qr = require('qr-encode');

var port = 3000;

var qrCode = qr(ip.address() + ':' + port + '/controller', { type: 6, size: 3, level: 'Q'})

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
  socket.emit('qr', qrCode);
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

  socket.on('device motion', function (input) {
    gameConsole.emit('device motion', {
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

http.listen(port, function(){
  console.log('listening on *:' + port);
});