var http = require('http').Server(app);
var path = require('path');
var app = require('express')();
var io = require('socket.io')(http);

var LISTENING_PORT = 3000

app.get('/', function(req, res) {
    //res.sendFile('index.html', { root: path.join(__dirname + '/static/') });
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

http.listen(LISTENING_PORT, function() {
    console.log('listening on *:' + LISTENING_PORT);
});
