var database = require('./database');
function unit_to_country(data, callback){
    connection = database.connect();
    var sql = 'UPDATE Countries ';
    sql += 'SET Units_Amount = Units_Amount + ' + connection.escape(data.amount);
    sql += 'WHERE Countries.ID = ' + connection.escape(data.country);
       connection.query(sql,
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
