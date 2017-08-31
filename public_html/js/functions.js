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
    add: function(country_name, amount) {
      socket.emit("country_unit_add", {
        //"selected_country": country_id,
        "selected_country": country_name,
        "unit_amount": amount,
    });
  },

    get: function(country_name) {
      socket.emit("country_unit_get", {
        "selected_country": country_name,
      });
    }
  }
};
