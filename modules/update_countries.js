var database = require('./database-connect');

/*function unit_to_country(data, callback){
    connection = database.connect();
    var query = 'UPDATE Countries ';
    query += 'SET Units_Amount = Units_Amount + ' + connection.escape(data.amount);
    query += 'WHERE Countries.ID = ' + connection.escape(data.country);
       connection.query(query,
         function (error, results, fields) {
           if (error) {
             console.log(error);
             callback(false);
           } else {
             callback(true);
           }
      });
   connection.end();
}*/

var country = {

    addUnit: function(data, callback){
        connection = database.connect();
        var query = 'UPDATE Countries ';
        query += 'SET Units_Amount = Units_Amount + ' + connection.escape(data.unit_amount) + ' ';
        query += 'WHERE Name = ' + connection.escape(data.selected_country);
           connection.query(query,
             function (error, results, fields) {
               if (error) {
                 console.log(error);
                 callback(false);
               } else {
                 callback(true);
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
  resetUnitAmount: function(data, callback) {
    connection = database.connect();
    var query = 'UPDATE Countries ';
    query += 'SET Units_amount = 0 ';
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
}



}
module.exports.country = country;
