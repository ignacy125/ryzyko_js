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
  createLog: function createLog(content, data) {
    if(typeof data === 'undefined'){
      data = 'default';
    }
    $('.game_info-console').html('<span class="console-log"> ' + content + data + "</span><br>");
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
    },

    reset: function(country_name) {
      socket.emit("country_unit_reset", {
        "selected_country": country_name,
      });
    }

  }
};
