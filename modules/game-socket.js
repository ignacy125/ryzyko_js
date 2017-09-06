var database = require('./database-connect');
var fetch_data = require('./fetch-data');
var update_countries = require('./update_countries');

  function game_handler(io, userID) {
  SOCKETS_LIST = {};
  io
      .of('/game')
      .on('connection', function (socket) {
        console.log(userID);
          socket.id = Math.random();
          SOCKETS_LIST[socket.id] = socket;
          console.log("________________USER GAME CONNECTED____________________" + socket.id);
          socket.on('country_unit_add', function(data) {
            update_countries.country.addUnit(data, function(valid) {
              if(valid) {
                console.log("Jednostka została przypisana do kraju " + data.selected_country);
                socket.emit("country_unit_add_res", data);
              } else {
                console.log("Błąd");
              }

            });
          });
          socket.on('country_unit_get', function (data) {
              update_countries.country.getUnitAmount(data, function (valid, results) {
                  if (valid) {
                      console.log(results);
                      socket.emit("country_unit_get_res", results);
                  } else {
                      console.log("Błąd");
                  }

              });
          });
          socket.on('country_unit_reset', function(data){
            update_countries.country.resetUnitAmount(data, function (valid) {
                if (valid) {
                    console.log("Zresetowano ilość jednostek w kraju: " + data.selected_country);
                    socket.emit("country_unit_reset_res", data.selected_country);
                } else {
                    console.log("Błąd");
                }

            });
          });
          socket.on('player_showCountries', function(data){
            update_countries.country.show(data, function(valid, results) {
              if(valid) {
                console.log(results);
                socket.emit("player_showCountries_res", results);
              } else {
                console.log("Błąd");
              }
            });
          });
      });
};
module.exports.game_handler = game_handler;
