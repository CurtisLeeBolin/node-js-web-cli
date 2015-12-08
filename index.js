var express = require('express');
var https = require('https');
var http = require('http');
var pem = require('pem');

pem.createCertificate({days:365, selfSigned:true}, function(err, keys){
    var app = express();

    app.get('/', function (req, res) {
        var options = {
            root: __dirname + '/public/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        var fileName = 'index.html';
        res.sendFile(fileName, options, function (err) {
            if (err) {
              console.log(err);
              res.status(err.status).end();
            }
            else {
              console.log('Sent:', fileName);
            }
        });
    });

    http.createServer(app).listen(3000);
    https.createServer({key: keys.serviceKey, cert: keys.certificate},
        app).listen(3001);
    app.listen = function() {
        var server = http.createServer(this);
        return server.listen.apply(server, arguments);
    };
});
