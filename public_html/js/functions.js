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

var country = {
  emit: function(country_name, country_id) {
    if(typeof country_id === 'undefined') {
      country_id = 'default';
    } else if (typeof country_name === 'undefined') {
      country_name = 'default';
    }
    socket.emit("locate_unit", {
        //"selected_country": country_id,
        "selected_country": country_name,
    });
  },
  getUnit: function(country_name) {
    socket.emit("country_unit_amount", {
      "selected_country": country_name,
    });    
  }
}

$(document).ready(function() {

    $('.game_info_icon-arrow').click(function() {
        $('#game_info_wrapper-1').toggle();
    });

});
