var csv = require("csvtojson");

var db = require("../models");

db.sequelize.sync({ force: true });

console.log("Creating fake user.");
db.User.create({
  userName: "user",
  email: "mail@mail.com",
  password: "password"
}).then(function(dbUser) {
  console.log("Creating fake device.");
  db.Device.bulkCreate({
    deviceName: "Test Device",
    UserId: dbUser.id,
    PlantId: 1
  }).then(function(dbDevice) {
    console.log("Creating fake live data.");
    csv()
      .fromFile("./data.csv")
      .then(function(jsonObj) {
        jsonObj.map(function(obj) {
          obj.DeviceId = dbDevice.id;
        });
        db.LiveStats.bulkCreate(jsonObj).then(function() {
          console.log("Completed script.");
        });
      });
  });
});
