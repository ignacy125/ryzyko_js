var database = require('./database-connect');

var game = {
  reset: function(data, callback) {
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
  }
}
