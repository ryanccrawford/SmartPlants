var csv = require("csvtojson");

var db = require("../models");

db.sequelize
  .sync({
    force: true
  })
  .then(function() {
    console.log("Creating fake user.");
    db.User.create({
      userName: "user",
      email: "mail@mail.com",
      password: "password"
    }).then(function(dbUser) {
      console.log("Creating fake device.");
      db.Device.create({
        deviceName: "Test Device",
        UserId: dbUser.id,
        PlantId: 1
      }).then(function(dbDevice) {
        console.log("Creating fake live data.");
        csv({
          colParser: {
            createdAt: function(item) {
              return new Date(item);
            }
          }
        })
          .fromFile("./scripts/data.csv")
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
  });
