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

//this code below will not supply database because Device.UserId cannot be null, need to somehow link user with device
$("#addDeviceButton").on("click", function() {
  var device = $("#deviceID")
    .val()
    .trim();
  var plant = $("#plantName")
    .val()
    .trim();

  $.ajax("/api/devices", {
    type: "POST",
    data: { deviceName: device }
  }).then(function(data) {
    console.log(data);
  });

  $.ajax("/api/plants", {
    type: "POST",
    data: { plantName: plant }
  }).then(function(data) {
    console.log(data);
    displayAllPlants();
  });
});

//this code will be for appending all plants of user to the page in card form
function displayAllPlants() {
  $.get("/api/plants", function(data) {
    for (var i = 0; i < data.length; i++) {
      var newDiv1 = $("<div>");
      var newDiv2 = $("<div>").addClass("card horizontal");
      var newDiv3 = $("<div>")
        .addClass("card-image")
        .css("width", "120px");

      var newImage = $("<img>")
        .attr("id", "img" + i)
        .attr("src", "")
        .attr("height", "150px");

      newDiv3.append(newImage);

      var newDiv4 = $("<div>").addClass("card-stacked");
      var newDiv5 = $("<div>").addClass("card-content");
      var newH = $("<h3>").text(data[i].plantName);

      newDiv5.append(newH);

      var newDiv6 = $("<div>").addClass("card-action");
      //need to figure out url to each plant for stats
      var newA = $("<a>")
        .attr("id", "aOne" + i)
        .attr("href", "")
        .text("Go to Stats");
      var newA2 = $("<a>")
        .attr("id", "aTwo" + i)
        .attr("href", "")
        .text("Delete this Device");

      newDiv6.append(newA, newA2);
      newDiv4.append(newDiv5, newDiv6);
      newDiv2.append(newDiv3, newDiv4);
      newDiv1.append(newDiv2);

      $(".newPlantButtonsGoHere").append(newDiv1);

      $.get("/api/images/" + data[i].plantName).done(function(data) {
        var whichPlant = "#img" + i;
        var json = JSON.parse(data);
        console.log(json);
        var plantImage = json.images.value[0].thumbnailUrl;
        console.log(plantImage);
        $(whichPlant).attr("src", plantImage);
      });
    }
  });
}

//Under here
//is just an
//example
//until above code
//can work
var newDiv1 = $("<div>");
var newDiv2 = $("<div>").addClass("card horizontal");
var newDiv3 = $("<div>")
  .addClass("card-image")
  .css("width", "120px");
var newImage = $("<img>")
  .attr("id", "img1")
  .attr("src", " ")
  .attr("height", "150px");

newDiv3.append(newImage);

var newDiv4 = $("<div>").addClass("card-stacked");
var newDiv5 = $("<div>").addClass("card-content");
var newH = $("<h3>").text("Rose");

newDiv5.append(newH);

var newDiv6 = $("<div>").addClass("card-action");
//need to figure out url to each plant for stats
var newA = $("<a>")
  .attr("href", "")
  .text("Go to Stats");
var newA2 = $("<a>")
  .attr("href", "")
  .text("Delete this Device");

newDiv6.append(newA, newA2);
newDiv4.append(newDiv5, newDiv6);
newDiv2.append(newDiv3, newDiv4);
newDiv1.append(newDiv2);

$(".newPlantButtonsGoHere").append(newDiv1);

$.get("/api/images/" + "rose").done(function(data) {
  var whichPlant = "#img" + 1;
  var json = JSON.parse(data);
  console.log(json);
  var plantImage = json.images.value[0].thumbnailUrl;
  console.log(plantImage);
  $(whichPlant).attr("src", plantImage);
});

var newDiv1 = $("<div>");
var newDiv2 = $("<div>").addClass("card horizontal");
var newDiv3 = $("<div>")
  .addClass("card-image")
  .css("width", "120px");
var newImage = $("<img>")
  .attr("id", "img2")
  .attr("src", "")
  .attr("height", "150px");

newDiv3.append(newImage);

var newDiv4 = $("<div>").addClass("card-stacked");
var newDiv5 = $("<div>").addClass("card-content");
var newH = $("<h3>").text("Cilantro");

newDiv5.append(newH);

var newDiv6 = $("<div>").addClass("card-action");
//need to figure out url to each plant for stats
var newA = $("<a>")
  .attr("href", "")
  .text("Go to Stats");
var newA2 = $("<a>")
  .attr("href", "")
  .text("Delete this Device");

newDiv6.append(newA, newA2);
newDiv4.append(newDiv5, newDiv6);
newDiv2.append(newDiv3, newDiv4);
newDiv1.append(newDiv2);

$(".newPlantButtonsGoHere").append(newDiv1);

$.get("/api/images/" + "cilantro").done(function(data) {
  var whichPlant = "#img" + 2;
  var json = JSON.parse(data);
  console.log(json);
  var plantImage = json.images.value[0].thumbnailUrl;
  console.log(plantImage);
  $(whichPlant).attr("src", plantImage);
});
