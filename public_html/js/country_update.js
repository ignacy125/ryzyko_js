$(document).ready(function(){


  // socket = io();

  var unit_amount_text;
  var selected_country;
  var game_area = $('#game-map area');

  $(game_area).click(function(event) {
      event.preventDefault();
      selected_country = $(this).attr('data-title');
      player.createLog("Selected country: ", selected_country);
      country.unit.get(selected_country);
      country.unit.add(selected_country, 1);
      // Reset ilości jednostek
      $('.btn-reset').show();
      $('.btn-reset').click(function(){
        country.unit.reset(selected_country);
      });
      $('.btn-relocate').show();
  });

  $(game_area).on('mouseover', function(){
      selected_country = $(this).attr('data-title');
      country.unit.get(selected_country);
  });

  $('#game-map area').contextmenu(function(event){
    event.preventDefault();
    country.unit.add(selected_country, -1);
  });


  /*
  // Ukrycie tektsu o lokowaniu jednostki, gdy user klika lub najeżdza na inny element
  $('html').on('mouseover', function(){

  });
  $('html').on('click', function(){
    $('.game_info-units_amount').hide();
    $('.game_info-units_amount_title').hide();
    $('.game_info_text:nth-child(2)').hide();
    $('.game_info_btn_wrapper').hide();
  });

  // Dodanie jednostki(ek) do kraju
  $('#game-map area').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      selected_country = $(this).attr('data-title');
      $('.game_info-console').html("Selected country: " + selected_country);
      country.unit.get(selected_country);
      // $('.btn-add').show();
      // $('.btn-add').click(function(){
      //   country.unit.add(selected_country, 1);
      // });
      country.unit.add(selected_country, 1);
      // Reset ilości jednostek
      $('.btn-reset').show();
      $('.btn-reset').click(function(){
        country.unit.reset(selected_country);
      });
      $('.btn-relocate').show();

  });

  $('.btn-relocate').click(function(){
    alert("Wybierz kraj do, ktrórego chcesz dyslokować jednostki");
    $('#game-map area').click(function(){
      socket.emit("country_unit_relocate", {
          "selected_country": selected_country
      });
      var countryAmount = prompt("Wprowadź ilość jednostek...");
      country.unit.add(selected_country, countryAmount);

    });
  });

  $('#game-map area').contextmenu(function(event){
    event.preventDefault();
    event.stopPropagation();
    country.unit.add(selected_country, -1);
  });

  // Pobranie informacji o ilości jednostek w kraju
  $('#game-map area').on('mouseover', function(){
      $('.game_info_text:nth-child(2)').show();
      $('.game_info_btn_wrapper').show();
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
*/

});
