var database = require('./database-connect');

function getBsData(data, callback, select_param, from_param, where_param1, where_param2) {
  connection = database.connect();
  query = 'SELECT' + select_param + 'FROM' + from_param;
  query += 'WHERE' + where_param1 + '=' + where_param2;
  if(typeof where_param1 === 'undefined' && typeof where_param2 === 'undefined') {
    where_param1 = '';
    where_param2 = '';
  }
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

module.exports.getBsData = getBsData;
