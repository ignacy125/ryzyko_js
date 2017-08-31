$(document).ready(function(){

  socket = io();

  var unit_amount_text;
  var selected_country;

  socket.on('country_unit_add_res', function(data){
      $('.game_info_text-log').html('Unit' + ' (' + data + ') was located to: ' + '<kbd>' + selected_country + '</kbd>');
  });

  $('html').on('mouseover', function(){
    $('.game_info-units_amount').hide();
    $('.game_info-units_amount_title').hide();
  });
  $('html').on('click', function(){
    $('.game_info-units_amount').hide();
    $('.game_info-units_amount_title').hide();
  });

  $('#game-map area').click(function(event) {
      event.preventDefault();
      selected_country = $(this).attr('data-title');
      console.log(selected_country);
      country.unit.add(selected_country, 1);

  });
  $('#game-map area').on('mouseover', function(event){
    event.stopPropagation();
    selected_country = $(this).attr('data-title');
    country.unit.get(selected_country);
  });

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
