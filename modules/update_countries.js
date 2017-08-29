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

function unit_to_country(data, callback){
    connection = database.connect();
    var query = 'UPDATE Countries ';
    query += 'SET Units_Amount = Units_Amount + 1 ';
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
}

function get_unit_amount(data, callback) {
  connection = database.connect();
  var query = 'SELECT Name, Units_amount FROM Countries ';
  query += 'WHERE Name = ' + connection.escape(data.selected_country);
  query +=
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
}
module.exports.unit_to_country = unit_to_country;
module.exports.get_unit_amount = get_unit_amount;
