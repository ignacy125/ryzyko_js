

$(document).ready(function(){
  socket = io();
$('#locate_unit').click(function(e){
  e.preventDefault();
  var unit_locate_answer = prompt("Ile jednostek?");
  var unit_locate_country_answer = prompt("Który kraj?");
  socket.emit("unit_locate_data", {
    "amount": unit_locate_answer,
    "country": unit_locate_country_answer,
  });
});
});
