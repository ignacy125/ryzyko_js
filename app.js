var express = require('express');
var app = express();
var session = require('express-session');
var server = require('http').Server(app);
var io = require('socket.io')(server,{});
var fs = require('fs');
var sha1 = require('sha1');
var database = require('./modules/database-connect');
var fetch_data = require('./modules/fetch-data');
var update_countries = require('./modules/update_countries');
var port = 80;

//var hashed_password = sha1(password);

/*var passwordHash = require('password-hash');
var hashedPassword = passwordHash.generate(password);
*/

//app.use(express.static(__dirname)); // Current directory is root

app.use('/', express.static(__dirname + '/public_html'));
server.listen(port);
console.log("Working on port " + port);

app.get('/', function (req, res) {
  res.writeHead(301,
  {Location: '/user/login/'}
  );
  res.end();
})

function handler (req, res) {
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

SOCKETS_LIST = {};
io.of('/logon')
io.on('connection', function (socket) {
  socket.id = Math.random();
  SOCKETS_LIST[socket.id] = socket;
  console.log("user connected");
  var test = sha1("sdadas");
  console.log(test);
    socket.on('hello', function (data) {
      console.log("hello " + data);
      socket.emit("server_msg", {
        msg : "server_hello",
      });
    });
    socket.on('login', function(data){
      fetch_data.fetch_data(data, function(valid){
        if(valid) {
            socket.emit("login_response", data.username);
            socket.emit("login_response", data.password);
        } else {
            socket.emit("login_response", "login_fail");
        }
      });
    });
});
  io.of('/game')
   io.on('connection', function (socket) {
       socket.id = Math.random();
        SOCKETS_LIST[socket.id] = socket;
        console.log("________________USER GAME CONNECTED____________________");
    socket.on('country_unit_add', function(data) {
      update_countries.country.addUnit(data, function(valid) {
        if(valid) {
          console.log("Jednostka została przypisana do kraju " + data.selected_country);
          socket.emit("country_unit_add_res", data.unit_amount)
        } else {
          console.log("Błąd");
        }

      });
    });
    socket.on('country_unit_get', function(data){
      update_countries.country.getUnitAmount(data, function(valid, results) {
        if(valid) {
          console.log(results);
          socket.emit("country_unit_get_res", results);
        } else {
          console.log("Błąd");
        }

      });
    });
    socket.on('player_showCountries', function(data){
      update_countries.country.show(data, function(valid, results) {
        if(valid) {
          console.log(results);
          io.emit("player_showCountries_res", results);
        } else {
          console.log("Błąd");
        }

      });
    });

});

setInterval(function(){
  for (var i in SOCKETS_LIST ){
    socket = SOCKETS_LIST[i];
    socket.emit("server_msg", {
      msg : "server_hello: "+ i,
    });
  }},1000);
