$(document).ready(function(){

socket = io('/game');

// Odpowiedź na informacje o ilości jednostek w kraju
socket.on("country_unit_get_res", function(data){
  var units_amount = data.result["Units_amount"];
  var country = data.country;

  $('area[data-title="' + country + '"]').tooltipster({
      content: units_amount,
      multiple: true,
      side: 'top'
    });

  // $('.game-wrapper__units').html('Units amount: <kbd>' + units_amount + '</kbd>');

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

// Zaznaczenie krajów na kolor gracza
socket.on("country_hilight_res", function(data){

  var countries;
  var user_color;
  var i;
  for (i in data) {
    countries = data[i]["Name"];
    user_color = data[i]["Color"];
    if(user_color == 'green'){
      user_color = '33cc33';
    } else if (user_color == 'blue'){
      user_color = '0099ff';
    };
    $('area[data-title="' + countries + '"]').data("maphilight", { fillColor: user_color, fillOpacity: 0.3, stroke: false });
  };

  // Wyróżnienie krajów bez jednostek domyślnie jest wyłączone
  $('#game-map-img').maphilight({
    alwaysOn: true,
    fillColor: 'ffffff',
    fillOpacity: 0,
    stroke: false
  });

});

});
