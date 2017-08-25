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



function emitCountry(country_id, name) { // Name jest opcjonalne
    if (typeof name === 'undefined') {
        name = 'default';
    }
    socket.emit("send_country", {
        "selected_country": country_id,
    });
}

$(document).ready(function() {
    var selected_country;
    $('#game-map area').click(function(event) {
        event.preventDefault();
        selected_country = $(this).attr('data-title');
        switch (selected_country) {
            default: alert("Wystąpił błąd lub nie wybrałeś kraju.");
            break;
            case 'Alaska':
                    emitCountry(1);
                break;
            case 'Alberta':
                    emitCountry(2);
                break;
            case 'North_west':
                    emitCountry(3);
                break;
            case 'Ontario':
                    emitCountry(4);
                break;
            case 'Western_usa':
                    emitCountry(5);
                break;
            case 'Eastern_usa':
                    emitCountry(6);
                break;
            case 'Quebec':
                    emitCountry(7);
                break;
            case ' Greenland':
                    emitCountry(8);
                break;
            case 'Central_america':
                    emitCountry(9);
                break;
            case 'Venezuela':
                    emitCountry(10);
                break;
            case 'Brazil':
                    emitCountry(11);
                break;
            case 'Peru':
                    emitCountry(12);
                break;
            case 'Argentina':
                    emitCountry(13);
                break;
            case 'North_africa':
                    emitCountry(14);
              break;
            case 'South_africa':
                    emitCountry(15);
              break;
            case 'East_africa':
                    emitCountry(16);
              break;
            case 'Egypt':
                    emitCountry(17);
              break;
            case 'Congo':
                    emitCountry(18);
              break;
            case 'Madagascar':
                    emitCountry(19);
              break;

        }
    });

    $('.game_info_icon-arrow').click(function() {
        $('#game_info_wrapper-1').toggle();
    });

});
