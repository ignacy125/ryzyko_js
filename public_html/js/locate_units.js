$(document).ready(function(){

  socket = io();

  var selected_country;
  $('#game-map area').click(function(event) {
      event.preventDefault();
      selected_country = $(this).attr('data-title');
      switch (selected_country) {
          default:
          alert("Wystąpił błąd lub nie wybrałeś kraju.");
          break;
          case 'Alaska':
                  //country.emit('Alaska');
                  //getCountryUnitAmount('Alaska');
                  country.emit('Alaska');
              break;
          case 'Alberta':
                  country.emit('Alberta');
              break;
          case 'North_west':
                  country.emit('North_west');
              break;
          case 'Ontario':
                  country.emit('Ontario');
              break;
          case 'Western_usa':
                  country.emit('Western_usa');
              break;
          case 'Eastern_usa':
                  country.emit('Eastern_usa');
              break;
          case 'Quebec':
                  country.emit('Quebec');
              break;
          case ' Greenland':
                  country.emit('Greenland');
              break;
          case 'Central_america':
                  country.emit('Central_america');
              break;
          case 'Venezuela':
                  country.emit('Venezuela');
              break;
          case 'Brazil':
                  country.emit('Brazil');
              break;
          case 'Peru':
                  country.emit('Peru');
              break;
          case 'Argentina':
                  country.emit('Argentina');
              break;
          case 'North_africa':
                  country.emit('North_africa');
            break;
          case 'South_africa':
                  country.emit('South_africa');
            break;
          case 'East_africa':
                  country.emit('East_africa');
            break;
          case 'Egypt':
                  country.emit('Egypt');
            break;
          case 'Congo':
                  country.emit('Congo');
            break;
          case 'Madagascar':
                  country.emit('Madagascar');
            break;
          case 'Iceland':
                  country.emit('Iceland');
            break;
          case 'Great_britain':
                  country.emit('Great_britain');
            break;
          case 'Western_europe':
                  country.emit('Western_europe');
            break;
          case 'Northern_europe':
                  country.emit('Northern_europe');
            break;
          case 'Southern_europe':
                  country.emit('Southern_europe');
              break;
          case 'Ukraine':
                  country.emit('Ukraine');
              break;
          case 'Scandinavia':
                  country.emit('Scandinavia');
              break;
      }
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
