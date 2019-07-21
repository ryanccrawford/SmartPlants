var csv = require("csvtojson");
const bCrypt = require("bcrypt-nodejs");

var db = require("../models");

db.sequelize
  .sync({
    force: true
  })
  .then(function() {
    console.log("Creating a fake plant.");
    db.Plant.create({
      plantName: "Rose",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.v_Y2bwYk0jGZpW8FU_wW1QHaHa&pid=Api"
    }).then(function(dbPlant) {
      console.log("Creating fake user.");
      db.User.create({
        userName: "jan",
        email: "mail@mail.com",
        password: bCrypt.hashSync("password", bCrypt.genSaltSync(8), null)
      }).then(function(dbUser) {
        console.log("Creating fake device.");
        db.Device.create({
          deviceName: "Test Device",
          UserId: dbUser.id,
          PlantId: dbPlant.id
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
                console.log("Completed live data.");
              });
              db.HistStats.bulkCreate(jsonObj).then(function() {
                console.log("Completed hist data.");
              });
            });
        });
      });
    });
  });
