socket = io('/logon');

function updateValues() {
  socket.emit("hello", "world");
}

$('#login_form').submit(function(e) {
  var username_value = $('#username').val();
  if(username_value.length == '') {
    alert("Enter username please");
    return false;
  }
  e.preventDefault();
  login();
});

socket.on('login_response', function(data){
  if(data != "login_fail"){
  //alert("Logowanie poprawne, witaj " + data);
  console.log("Logowanie poprawne");
   window.location.replace("/game");
  } else {
    alert("Logowanie niepoprawne");
  }
});

/*var canvas = document.getElementById('game-map');
var context = canvas.getContext('2d');

context.moveTo(294, 164.5 - 74.5);
context.bezierCurveTo(294 + (0.5522847498307936 * 79), 164.5 - 74.5,  294 + 79, 164.5 - (0.5522847498307936 * 74.5), 294 + 79, 164.5);
context.bezierCurveTo(294 + 79, 164.5 + (0.5522847498307936 * 74.5), 294 + (0.5522847498307936 * 79), 164.5 + 74.5, 294, 164.5 + 74.5);
context.bezierCurveTo(294 - (0.5522847498307936 * 79), 164.5 + 74.5, 294 - 79, 164.5 + (0.5522847498307936 * 74.5), 294 - 79, 164.5);
context.bezierCurveTo(294 - 79, 164.5 - (0.5522847498307936 * 74.5), 294 - (0.5522847498307936 * 79), 164.5 - 74.5, 294, 164.5 - 74.5);
context.fillStyle = 'rgba(255, 0, 0, 0.5)';
context.fill();
context.stroke();
*/
