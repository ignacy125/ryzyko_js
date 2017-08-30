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
                  country.unit.add('Alaska');
              break;
          case 'Alberta':
                  country.unit.add('Alberta');
              break;
          case 'North_west':
                  country.unit.add('North_west');
              break;
          case 'Ontario':
                  country.unit.add('Ontario');
              break;
          case 'Western_usa':
                  country.unit.add('Western_usa');
              break;
          case 'Eastern_usa':
                  country.unit.add('Eastern_usa');
              break;
          case 'Quebec':
                  country.unit.add('Quebec');
              break;
          case ' Greenland':
                  country.unit.add('Greenland');
              break;
          case 'Central_america':
                  country.unit.add('Central_america');
              break;
          case 'Venezuela':
                  country.unit.add('Venezuela');
              break;
          case 'Brazil':
                  country.unit.add('Brazil');
              break;
          case 'Peru':
                  country.unit.add('Peru');
              break;
          case 'Argentina':
                  country.unit.add('Argentina');
              break;
          case 'North_africa':
                  country.unit.add('North_africa');
            break;
          case 'South_africa':
                  country.unit.add('South_africa');
            break;
          case 'East_africa':
                  country.unit.add('East_africa');
            break;
          case 'Egypt':
                  country.unit.add('Egypt');
            break;
          case 'Congo':
                  country.unit.add('Congo');
            break;
          case 'Madagascar':
                  country.unit.add('Madagascar');
            break;
          case 'Iceland':
                  country.unit.add('Iceland');
            break;
          case 'Great_britain':
                  country.unit.add('Great_britain');
            break;
          case 'Western_europe':
                  country.unit.add('Western_europe');
            break;
          case 'Northern_europe':
                  country.unit.add('Northern_europe');
            break;
          case 'Southern_europe':
                  country.unit.add('Southern_europe');
            break;
          case 'Ukraine':
                  country.unit.add('Ukraine');
            break;
          case 'Scandinavia':
                  country.unit.add('Scandinavia');
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
