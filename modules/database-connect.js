function connect() {
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'minecraftweb.pl',
   user     : 'ignacy_grauser',
   password : 'hDG2%[wuhp,}',
   database : 'ignacy_ryzyko'
 });
 connection.connect(function(err) {
   if (err) {
     console.error('error connecting: ' + err.stack);
     return;
   }
  console.log('connected as id ' + connection.threadId);


 });
 return connection;
}

module.exports.connect = connect;
