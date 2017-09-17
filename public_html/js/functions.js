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

// Limit akcji na daną fazę
var actions_limit =  20;

// Dane o akcjach do wysłania na serwer
turn_data = {
  "actions": [

  ]
};

var action = {
  send: function(action_name, data){
    turn_data.actions.push(
      {action: action_name, data: data}
    );
    // action.count();
    if(turn_data.actions.length >= actions_limit){
      alert("Koniec ruchów");
      $(".overlay").css("pointer-events", "none");
    }
  }
}

var player = {
  nextTurn: function(){
    var user_id = parseInt(document.URL[document.URL.length-1], 10);
    console.log(user_id);
    socket.emit("player_nextTurn", {
      "user_id": user_id

    });
    $(".overlay").css("pointer-events", "none");
  },
  createLog: function createLog(content, data) {
    if(typeof data === 'undefined'){
      data = 'default';
    }
    $('.game_info-console').html('<span class="console-log"> ' + content + data + "</span><br>");
  },
};

var country = {
  unit: {
    add: function(country_name, amount) {
      action.send("addUnit", amount)
      socket.emit("country_unit_add", {
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
      action.send("resetUnit", null);
      socket.emit("country_unit_reset", {
        "selected_country": country_name,
      });
    }
  }
};
