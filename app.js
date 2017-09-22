var express = require('express');
var app = express();
var session = require('express-session');
var server = require('http').Server(app);
var io = require('socket.io')(server, {});
var fs = require('fs');
var sha1 = require('sha1');
var database = require('./modules/database-connect');
var fetch_data = require('./modules/fetch-data');
var update_countries = require('./modules/update_countries');
var port = 80;
USERS_LIST = {}

app.use('/', express.static(__dirname + '/public_html'));
server.listen(port);
console.log("Working on port " + port);

app.get('/', function (req, res) {
    res.writeHead(301,
        {Location: '/user/login/'}
    );
    res.end();
});

app.get('/game/:userID', function (req, res) {
  USERS_LIST[0] = req.params.userID;
  fs.readFile(__dirname +"/public_html/game/index.html", function (err, data){
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.write(data);
  res.end();

  });
});

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

var logon_socket = require("./modules/logon-socket");
var game_socket = require('./modules/game-socket');

logon_socket.user.logon(io);
console.log(USERS_LIST);
game_socket.game_handler(io);

// game_socket.turn_handler();

 setInterval(function () {
//     for (var i in SOCKETS_LIST) {
//         socket = SOCKETS_LIST[i];
//         socket.emit("server_msg", {
//             msg: "server_hello: " + i,
//         });
//     }
}, 1000);
