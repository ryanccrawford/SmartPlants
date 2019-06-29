$("#loginButton").on("click", function() {
  var user = {
    userName: $("#user")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim()
  };

  $.ajax("/api/users", {
    type: "POST",
    data: user
  }).then(function(data) {
    var query = "/api/user/" + data.userName;
    $.get(query, function(data) {
      userID = data.id;
    });
  });
});


