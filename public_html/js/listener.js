socket = io();

socket.on("country_unit_get_res", function(data){
  console.log(data);

});
