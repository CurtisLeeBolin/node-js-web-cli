var express = require('express');
var jade = require('jade');
var https = require('https');
var http = require('http');
var pem = require('pem');

pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
    var app = express();
    var io = require('socket.io')(http);

    app.use(express.static(__dirname + '/static'));

    //app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.get('/', function (req, res) {
        res.render('index', { title: 'PLACEHOLDER' });
    });

    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
        socket.on('start cli app', function() {
            console.log('start button pressed')
        })
    });

    http.createServer(app).listen(3000);
    https.createServer({key: keys.serviceKey, cert: keys.certificate},
        app).listen(3001);
    app.listen = function() {
        var server = http.createServer(this);
        return server.listen.apply(server, arguments);
    };
});
