var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("landing");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/users/:username", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.params.username
      },
      include: [
        {
          model: db.Device,
          include: [db.Plant]
        }
      ]
    }).then(function(user) {
      res.render("user", { user: user });
    });
  });

  app.get("/devices/:id", function(req, res) {
    db.Device.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Plant, db.User, db.LiveStats]
    }).then(function(device) {
      var currentStats;
      if (device.LiveStats.length) {
        currentStats = device.LiveStats.reduce(function(prev, curr) {
          return prev.timeStamp > curr.timeStamp ? prev : curr;
        }); //returns object
      }
      res.render("device", { device: device, currentStats: currentStats });
    });
  });

  /*
  app.get("/api/device", function(req, res) {
    res.send(req.body);
  });
  */
  // Render 404 page for any unmatched routes
};
