var database = require('./database-connect');
var sha1 = require('sha1');

function fetch_data(data, callback) {
  connection = database.connect();
  var hashPassword = sha1(data.password);
  console.log(hashPassword);
  var query = 'SELECT ID FROM Users ';
  query += 'WHERE nick = ' + connection.escape(data.username);
  query += ' AND password = ' + connection.escape(hashPassword);
     connection.query(query,
       function (error, results, fields) {
         if (error) {
           callback(false, null);
         };
        if (results.length > 0) {
          callback(true, results[0].ID);
          console.log(results[0].ID);

        } else {
          callback(false, null);
        }

    });
 connection.end();
}

module.exports.fetch_data = fetch_data;
