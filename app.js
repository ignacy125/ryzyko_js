var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server,{});
var fs = require('fs');
var sha1 = require('sha1');
var database = require('./modules/database-connect');
var getBsData  = require('./modules/get-bs-data');
var fetch_data = require('./modules/fetch-data');
var update_countries = require('./modules/update_countries');
//var getUnitAmount = require('./modules/get-unit-amount');
var port = 80;

//var hashed_password = sha1(password);

/*var passwordHash = require('password-hash');
var hashedPassword = passwordHash.generate(password);
*/

//app.use(express.static(__dirname)); // Current directory is root
app.use('/', express.static(__dirname + '/public_html')); //  "public" off of current is root
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

/*
 var user_unit_amount = 'SELECT Units_to_deploy FROM Users WHERE ID = 1';
*/

SOCKETS_LIST = {};
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
            // var unit_info_bs = getBsData.getBsData(data, funtion(valid){
            //
            //
            // }), 'Units_to_deploy', 'Users');
            // console.log(unit_info_bs);
        } else {
            socket.emit("login_response", "login_fail");
        }
      });
    });
    /*socket.on('unit_locate_data', function(data) {
     update_countries.unit_to_country(data, function(valid){
       if(valid) {
          console.log("work");
           socket.emit("update_state", "succes");
       } else {
         console.log("fail");
           socket.emit("update_state", "fail");
       }
     });
   });*/
    socket.on('send_country', function(data) {
      update_countries.unit_to_country(data, function(valid) {
        if(valid) {
          console.log("Jednostka została przypisana do kraju " + data.selected_country);
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
      msg : "server_hello",
    });
  }},1000);
