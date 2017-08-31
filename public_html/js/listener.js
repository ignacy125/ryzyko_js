socket = io();
var socket = io.connect('http://localhost:80');
socket.on("country_unit_get_res", function(data){
  console.log(data["Units_amount"]);
  $('.game_info-units_amount').html('<kbd>' + data["Units_amount"] + '</kbd>');
  $('.game_info-units_amount_title').show();
  $('.game_info-units_amount').show();
});
