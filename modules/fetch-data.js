var database = require('./database-connect');
var sha1 = require('sha1');

function fetch_data(data, callback) {
  connection = database.connect();
  var query = 'SELECT ID FROM Users ';
  query += 'WHERE nick = ' + connection.escape(data.username);
  query += ' AND password = ' + connection.escape(data.password);
     connection.query(query,
       function (error, results, fields) {
         if (error) {
           callback(false);
         };
        if (results.length > 0) {
          callback(true);

        } else {
          callback(false);
        }

    });
 connection.end();
}

module.exports.fetch_data = fetch_data;
