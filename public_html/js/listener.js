$(document).ready(function(){

socket = io('/game');

// Odpowiedź na informacje o ilości jednostek w kraju
socket.on("country_unit_get_res", function(data){
  var units_amount = data.result["Units_amount"];
  var country = data.country;
  $('.tool-tip').tooltipster({
      content: units_amount,
      multiple: true,
      side: 'top'
    });
  $('.game-wrapper__units').html('Units amount: <kbd>' + units_amount + '</kbd>');
});

// Odpowiedź na dodanie jednostki
socket.on('country_unit_add_res', function(data){
    $('.console').html('<span class="console-log"> Unit' + ' (' + data.unit_amount + ') was located to: ' + '<kbd>' + data.selected_country + '</kbd></span>');
    $(".fa-times").show();
});

// Odpowiedź na reset
socket.on("country_unit_reset_res", function(data){
    player.createLog('Zresetowano ilość jednostek w kraju ', data);
});

socket.on("your_turn_msg", function(data){
  console.log("Dziala");
  $('.overlay').css("pointer-events", "auto");
});

});
