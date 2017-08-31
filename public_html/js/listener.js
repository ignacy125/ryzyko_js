socket = io();
var socket = io.connect('http://localhost:80');
socket.on("country_unit_get_res", function(data){
  console.log(data);

});
