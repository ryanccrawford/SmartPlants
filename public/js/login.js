$("#loginButton").on("click", function(event) {
  event.preventDefault();
  var userName = $("#user")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  var data = {
    userName: userName,
    password: password
  };

  $.get("/api/user/" + userName)
    .then(function(user) {
      // redirect for demo
      window.location.href = "/users/" + user.userName;
    })
    .catch(function() {
      $.post("/api/users", data).then(function(newUser) {
        // redirect for demo
        window.location.href = "/users/" + newUser.userName;
      });
    });
});
