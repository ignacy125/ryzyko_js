function login() {
  var username = $('#username').val();
  console.log(username);
  socket.emit("login", {
    "username": username,
    "password": "12345",
  }
)
};
