var database = require('./database-connect');
var fetch_data = require('./fetch-data');
var update_countries = require('./update_countries');

var current_user;

 USER_IDS = {};

  function game_handler(io) {

  io
      .of('/game')
      .on('connection', function (socket) {
        var referer = socket.handshake.headers.referer;
        var user_id = parseInt(referer[referer.length-1], 10);
        current_user = user_id;
        console.log(user_id);
          USER_IDS[user_id] = socket;
          console.log("________________USER GAME CONNECTED____________________" + user_id);
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

          socket.on("player_nextTurn", function(data){
            console.log("Dziala " + data.user_id);
            turn_handler();

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

function turn_handler() {
      current_user = current_user++ % Object.keys(USER_IDS).length + 1;
      if(current_user == 0){
        current_user++;
      }
      socket = USER_IDS[current_user];
      console.log("Current user: " + current_user);
      socket.emit("your_turn_msg", {
          id: current_user
      });
}
module.exports.game_handler = game_handler;
// module.exports.turn_handler = turn_handler;
