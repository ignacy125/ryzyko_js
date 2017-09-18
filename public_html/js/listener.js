$(document).ready(function(){

socket = io('/game');

// Odpowiedź na informacje o ilości jednostek w kraju
socket.on("country_unit_get_res", function(data){
  $('.game-wrapper__units').html('Units amount: <kbd>' + data["Units_amount"] + '</kbd>');
  var newTitle = data["Units_amount"];
  var country = data.selected_country;
  $("#alaska").tooltipster({
      content: data["Units_amount"],
      multiple: true,
      side: 'top'
});
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
