$(document).ready(function(){

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

  // Pobranie ilości jednostek
  $(game_area).on('mouseover', function(){
      selected_country = $(this).attr('data-title');
      country.unit.get(selected_country);

  });

  // Usunięcie jednostki
  $('#game-map area').contextmenu(function(event){
    event.preventDefault();
    country.unit.add(selected_country, -1);
  });

  // Informacje o dyslokacji jednostek do przesłania na serwer
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
