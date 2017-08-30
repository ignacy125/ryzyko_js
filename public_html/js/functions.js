function login() {
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username);
    console.log(password)
    socket.emit("login", {
        "username": username,
        "password": password,
    })
};

var player = {
  nextTurn: function(){
    socket.emit("player_nextTurn", {


    });
  },
  showCountries: function() {
    socket.emit("player_showCountries", {
      "country": country_name,

    });
  }
};

var country = {
  unit: {
    add: function(country_name, country_id) {
      if(typeof country_id === 'undefined') {
        country_id = 'default';
      } else if (typeof country_name === 'undefined') {
        country_name = 'default';
      }
      socket.emit("country_unit_add", {
        //"selected_country": country_id,
        "selected_country": country_name,
    });
  },

    get: function(country_name) {
      socket.emit("country_unit_get", {
        "selected_country": country_name,
      });
    }
  }
};

$(document).ready(function() {

    $('.game_info_icon-arrow').click(function() {
        $('#game_info_wrapper-1').toggle();
    });
    $('#show_countries').click(function(){
      player.showCountries();
    });

});
