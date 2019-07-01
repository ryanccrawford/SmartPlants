$(document).ready(function() {
  $("#addDevice").modal();
  $("#deviceInput").hide();
  $("#addDeviceButton").hide();

  $("select").formSelect();
  $(".carousel").carousel();

  $("#pickPhoto").on("click", function() {
    var textInputText = $("#plantName")
      .val()
      .trim();
    $("#plantInput").hide();
    $("#pickPhoto").hide();
    buildCarousel(textInputText);
  });

  function buildCarousel(textInputText) {
    $(".carouselGoesHere").append("Pick your photo with a double click!");
    // make a call using ajax to backend picture api thing I made
    $.get("/api/images/" + textInputText).done(function(data) {
      //console.log("hi");
      var imageArray = [];
      var json = JSON.parse(data);
      //console.log(json);
      var loopThrough = json.images.value;
      //console.log(loopThrough);
      for (var i = 0; i < loopThrough.length; i++) {
        if (i >= 5) {
          break;
        } else {
          imageArray.push(loopThrough[i].thumbnailUrl);
        }
      }
      //console.log(imageArray);

      var carousel = $("<div>").addClass("carousel");
      $(".carouselGoesHere").append(carousel);
      // Then loop through the array of picturs

      for (var i = 0; i < imageArray.length; i++) {
        var newA = $("<a>").addClass("carousel-item");
        var img = $("<img>")
          .attr("id", "img" + i)
          .attr("src", imageArray[i])
          .attr("data-image", imageArray[i])
          .attr("data-name", textInputText);

        newA.append(img);
        carousel.append(newA);
        // end loop
      }
      $(".carousel").carousel();

      $(".carousel-item").on("dblclick", function(event) {
        var selectedImage = $(event.target).attr("data-image");
        var selectedName = $(event.target).attr("data-name");
        //then your code here to save the selected image to a global object that is then used when the usere saves the new device
        console.log(selectedImage);
        $(".carouselGoesHere").empty();
        $(".carouselGoesHere")
          .append("<h4>")
          .text("Picture selected, now choose your device.");
        $("#deviceInput").show();
        $("#deviceInput").css("margin-top", "50px");
        $("#addDeviceButton").show();

        //dummy code for appending image to plant Devices page until we pull info from database
        /*
        var newDiv1 = $("<div>");
        var newDiv2 = $("<div>").addClass(
          "card horizontal left-align valign-wrapper"
        );
        var newDiv3 = $("<div>")
          .addClass("card-image")
          .css("width", "120px");

        var newImage = $("<img>")
          .attr("id", "img2")
          .attr("src", selectedImage)
          .css("margin", "20px")
          .css("border-radius", "20%")
          .attr("height", "150px");

        newDiv3.append(newImage);

        var newDiv4 = $("<div>").addClass("card-stacked");
        var newDiv5 = $("<div>").addClass("card-content");
        var newH = $("<h3>")
          .text(selectedName)
          .attr("id", "cardName");

        newDiv5.append(newH);

        var newDiv6 = $("<div>").addClass("card-action");
        //need to figure out url to each plant for stats
        var newA = $("<a>")
          .attr("href", "")
          .text("Go to Stats")
          .attr("data-plantName", selectedName);

        var newA2 = $("<a>")
          .attr("href", "")
          .text("Delete this device")
          .attr("data-plant", selectedName);

        newDiv6.append(newA, newA2);
        newDiv4.append(newDiv5, newDiv6);
        newDiv2.append(newDiv3, newDiv4);
        newDiv1.append(newDiv2);

        $(".newPlantButtonsGoHere").append(newDiv1);
        */

        //on click of add device button plant name and device name and image url need to be sent to database
        $("#addDeviceButton").on("click", function() {
          var device = $("#device").val();
          var plant = selectedName;
          var image = selectedImage;

          console.log(`Device: ${device}\nPlant: ${plant}\nImage: ${image}`);
          plantData = {
            plantName: plant,
            image: image
          };
          var userName = window.location.pathname.replace("/users/", "");
          $.get("/api/users/" + userName).then(function(user) {
            $.post("/api/plants", plantData).then(function(newPlant) {
              deviceData = {
                deviceName: device,
                UserId: user.id,
                PlantId: newPlant.id
              };
              $.post("/api/devices", deviceData).then(function() {
                // refresh for demo
                location.reload();
              });
            });
          });
        });
      });
    });
  }
});
