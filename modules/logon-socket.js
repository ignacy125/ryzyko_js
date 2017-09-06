var database = require('./database-connect');
var fetch_data = require('./fetch-data');

var user = {
  logon: function(io) {
    SOCKETS_LIST = {};
    io
    .of('/logon')
    .on('connection', function (socket) {
        socket.id = Math.random();
        SOCKETS_LIST[socket.id] = socket;
        console.log("________________USER LOGON CONNECTED____________________");
        socket.on('hello', function (data) {
            console.log("hello " + data);
            socket.emit("server_msg", {
                msg: "server_hello",
            });
        });
        socket.on('login', function (data) {
            fetch_data.fetch_data(data, function (valid, id) {
                if (valid) {
                    socket.emit("login_response", id);
                } else {
                    socket.emit("login_response", "login_fail");
                }
            });
        });
    });
  }
}

module.exports.user = user;
