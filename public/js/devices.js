$.get("/api/devices", function(data) {
  console.log(data);
  //eventual loop through data to create buttons and call to api for pictures
});

//when add device button is clicked all data in input fields will be posted to /api/devices

$("#addDeviceButton").on("click", function() {
  event.preventDefault();
  var device = $("#deviceID")
    .val()
    .trim();
  var plant = $("#plantName")
    .val()
    .trim();
  var newDevice = {
    deviceID: device,
    plantName: plant
  };

  console.log(newDevice);
  $.ajax({
    method: "POST",
    url: "/api/device",
    data: newDevice
  }).then(function() {
    console.log(newDevice);
    window.location.href = "/plantDevices";
  });
});
