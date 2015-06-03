var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve( __dirname + '/../console/index.html'));
});

io.on('connect', function (socket) {
  console.log('User connected')
  socket.on('input', function (input) {
    console.log(input)
  })
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});