var database = require('./database-connect');


// Get user's unit amount
function getUnitAmount(data, callback) {
  connection = database.connect();
  query = 'SELECT Units_to_deploy FROM Users';
  query += 'WHERE ID = 1';
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

module.exports.getUnitAmount = getUnitAmount;
