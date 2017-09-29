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
            update_countries.country.addUnit(data, function(valid, message) {
              if(valid) {
                console.log("Jednostka została przypisana do kraju " + data.selected_country);
                socket.emit("country_unit_add_res", data);
              } else {
                console.log(message);
              }

            });
          });

          socket.on("player_nextTurn", function(data){
            // console.log("Dziala " + data.user_id);
            turn_handler();

          });

          socket.on('country_unit_get', function (data) {
              update_countries.country.getUnitAmount(data, function (valid, results, sel_country) {
                  if (valid) {
                      // console.log(results);
                      console.log(results);
                      console.log(sel_country);
                      socket.emit("country_unit_get_res", {
                        result: results,
                        country: sel_country
                      });
                  } else {
                      console.log("Błąd unit get");
                  }

              });
          });

          socket.on('country_unit_getAll', function (data) {
              update_countries.country.getAllUnits(data, function (valid, results) {
                  if (valid) {
                      //console.log(results);
                      socket.emit("country_unit_getAll_res", results);
                  } else {
                      console.log("Błąd unit get");
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

          socket.on('relocate_data_emit', function(data){
            update_countries.country.checkRelocation(data, function(valid, results) {
              if(valid) {
                console.log(results);
                dbres = parseInt(results.Units_amount, 10);
                res = parseInt(data.unit_amount, 10);
                console.log(dbres, res, results.Units_amount);
                if( dbres > res) {
                  console.log('dziala 123')
                  newData = {
                    "selected_country" : data.from,
                    "unit_amount" : -data.unit_amount
                  }
                  console.log(newData);
                  update_countries.country.addUnit(newData, function(valid) {
                    if(valid) {
                      console.log(valid);
                    } else {
                      console.log("Błąd");
                    }

                  });
                  newData.unit_amount = data.unit_amount;
                  newData.selected_country = data.to;
                  console.log(newData);
                  update_countries.country.addUnit(newData, function(valid) {
                    if(valid) {
                      console.log(valid);
                    } else {
                      console.log("Błąd");
                    }
                  });
                }
              } else {
                console.log("Błąd");
              }
            });
          });

          socket.on("country_hilight", function(data){
            update_countries.country.hilight(data, function(valid, results) {
              if(valid) {
                // console.log("Hiligthed countries: \n", results);
                socket.emit("country_hilight_res", results)
              } else {
                console.log("Błąd podczas wyświetlania krajów");
              }
            });
          });
      });
};
var next = function(key, keys){
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] == key) {

        if (i == keys.length -1){
          return keys[0];
        } else {
          return keys[i + 1];
        }
    }
  }
};

function turn_handler() {
      keys = Object.keys(USER_IDS);
      current_user = next(current_user, keys);
      // current_user = current_user++ % keys.length + 1;
      //
      // if(current_user == 0){
      //   current_user++;
      // }
      socket = USER_IDS[current_user];

      // console.log(USER_IDS);
      console.log("Current user: " + current_user);
      socket.emit("your_turn_msg", {
          id: current_user
      });
}



module.exports.game_handler = game_handler;
// module.exports.turn_handler = turn_handler;
