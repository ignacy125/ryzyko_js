$(document).ready(function(){

socket = io('/game');

// Odpowiedź serwera na informacje o ilości jednostek w kraju
socket.on("country_unit_get_res", function(data){
  $('.game_info-console').html('<span class="console-log">Units amount: <kbd>' + data["Units_amount"] + '</kbd></span>');
});

// Odpowiedź serwera na dodanie jednostki
socket.on('country_unit_add_res', function(data){
    $('.game_info-console').html('<span class="console-log"> Unit' + ' (' + data.unit_amount + ') was located to: ' + '<kbd>' + data.selected_country + '</kbd></span>');
});

socket.on("country_unit_reset_res", function(data){
    player.createLog('Zresetowano ilość jednostek w kraju ', data);
});

socket.on("your_turn_msg", function(data){
  console.log("Dziala");
  $('.overlay').css("pointer-events", "auto");
});

});
