$(document).ready(function(){

var newLog = '<span class="console-log">';
var newLogEnd = '</span><br>';
socket = io('/game');

// Odpowiedź serwera na informacje o ilości jednostek w kraju
socket.on("country_unit_get_res", function(data){
  console.log(data["Units_amount"]);
  $('.game_info-units_amount').html('<kbd>' + data["Units_amount"] + '</kbd>');
  $('.game_info-units_amount_title').show();
  $('.game_info-units_amount').show();
});

// Odpowiedź serwera na dodanie jednostki
socket.on('country_unit_add_res', function(data){
    $('.game_info_text-log').html('Unit' + ' (' + data.unit_amount + ') was located to: ' + '<kbd>' + data.selected_country + '</kbd>');
});

socket.on("country_unit_reset_res", function(data){
    $('.game_info-console').append(newLog + 'Zresetowano ilość jednostek w kraju: ' + data + newLogEnd);
});
});
