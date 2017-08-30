socket = io();
console.log("Logowanie poprawne");

socket.on("country_unit_get_response", function(data){
  alert(data.msg)
  console.log(data);

});
