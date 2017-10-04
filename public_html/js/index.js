$(document).ready(function(){

  var unit_amount_text;
  var selected_country;
  var game_area = $('#game-map area');
  var current_user = 1; // Test
  var user_id = parseInt(document.URL[document.URL.length-1], 10);

  $( "area" ).each(function( index, element ) {
    var area_attr = $(element).attr("data-title");
    // console.log(area_attr);
    // country.unit.get(area_attr);
  });

  country.unit.getAll();

  // Zaznaczenie krajów użytkownika
  country.hilight(user_id);

  $(game_area).click(function(event) {
      event.preventDefault();
      selected_country = $(this).attr('data-title');
      player.createLog("Selected country: ", selected_country);
      country.unit.get(selected_country);
      country.unit.add(selected_country, 1, user_id);
      $('.btn-game').show();
      // Reset kraju
      $('.btn-reset').click(function(){
        country.unit.reset(selected_country);
        // country.hilight(current_user, selected_country);
      });
      // Reset gry
      $('.btn-reset-game').click(function(){
        game.reset();
      });
  });

  // Pobranie ilości jednostek
  $(game_area).on('mouseover', function(){
      selected_country = $(this).attr('data-title');
      country.unit.get(selected_country);

  });

  // Usunięcie jednostki
  $(game_area).contextmenu(function(event){
    event.preventDefault();
    country.unit.add(selected_country, -1, user_id);
  });

  // Informacje o dyslokacji jednostek
  relocate_data = {
    "from": null,
    "to": null,
    "unit_amount": null
  };

  // Dyslokacja jednostek
  $('.btn-relocate').click(function(e){
      e.preventDefault();
      relocate_data["from"] = selected_country;
      alert("Wybierz kraj do którego chcesz dyslokować jednostki");
      $(game_area).click(function(){
        relocate_data["to"] = selected_country;
        var unit_amount = prompt("Ile?");
        relocate_data["unit_amount"] = unit_amount;
        socket.emit("relocate_data_emit", relocate_data);
        console.log(relocate_data);
        return true;
      });
  });

  // Koniec tury
  $('.btn-turn-change').click(function(event){
    event.preventDefault();
    player.nextTurn();
  });

  // Konsola
  $('.fa-times').click(function(event){
    event.preventDefault();
    $('.console').empty();
    $(this).hide();
  });

});
