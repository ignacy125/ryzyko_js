var database = require('./database-connect');

var country = {

    addUnit: function(data, callback){
        connection = database.connect();
        var query = 'UPDATE Countries ';
        query += 'SET Units_Amount = IF( User_ID = 0, Units_Amount + ' + connection.escape(data.unit_amount);
        query += ', Units_Amount) , User_ID =  IF(User_ID = 0, ' + connection.escape(data.user_id) + ', User_ID) ';
        query += 'WHERE Name = ' + connection.escape(data.selected_country);
           connection.query(query,
             function (error, results, fields) {
               if (error) {
                 console.log(error);
                 console.log(results);
                 callback(false, null);
               } else {
                 if (results.message.includes("Changed: 0")) {
                     console.log(results.message);
                     callback(false, "Country already assigned");
                 }
                 callback(true, null);
               }
          });
       connection.end();
    },

    getUnitAmount: function(data, callback) {
      connection = database.connect();
      var query = 'SELECT Units_amount FROM Countries ';
      query += 'WHERE Name = ' + connection.escape(data.selected_country);
      var sel_country = data.selected_country;
      connection.query(query,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            callback(false);
          }
          if (results.length > 0) {
            callback(true, results[0], sel_country);
          } else {
            callback(false);
          }
     });
    connection.end();
  },

  getAllUnits: function(data, callback) {
    connection = database.connect();
    var query = 'SELECT Name, Units_amount FROM Countries ';
    query += 'WHERE Name = '*' ';
    connection.query(query,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          callback(false);
        }
        if (results.length > 0) {
          callback(true, results);
        } else {
          console.log("Other sort of error")
          callback(false);
        }
   });
  connection.end();
},

  resetUnitAmount: function(data, callback) {
    connection = database.connect();
    var query = 'UPDATE Countries ';
    query += 'SET Units_amount = 0 ';
    query += ', User_ID = 0 ';
    query += 'WHERE Name = ' + connection.escape(data.selected_country);
    connection.query(query,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          callback(false);
        } else {
          callback(true, data);
        }
   });
  connection.end();
  },
  checkRelocation: function(data, callback){
    connection = database.connect();
    var query = 'SELECT Units_amount FROM Countries ';
    query += 'WHERE Name = ' + connection.escape(data.from);
    query += 'AND Adjacent LIKE ' + connection.escape("%"+data.to+"%");
    connection.query(query,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          console.log("Błąd 1");
          callback(false);
        }
        if (results.length > 0) {
          callback(true, results[0]);
        } else {
          console.log("Błąd 2");
          callback(false);
        }
   });
  connection.end();
},

  hilight: function(data, callback){
    connection = database.connect();
    var query = 'SELECT Name, Color FROM Countries, Users ';
    query += 'WHERE User_ID = Player_ID';
    // query += 'User_ID != 0 ';
    // query += 'AND Player_ID = ' + connection.escape(data.user_id) + ' ';
    // query += 'AND IF(Player_ID NOT' + connection.escape(data.user_id) + '1, 0) = 0 ';
    connection.query(query,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          console.log("Błąd 1");
          callback(false);
        }
        if (results.length > 0) {
          callback(true, results);
        } else {
          console.log("Błąd 2");
          callback(false);
        }
   });
  connection.end();
  }

}
module.exports.country = country;
