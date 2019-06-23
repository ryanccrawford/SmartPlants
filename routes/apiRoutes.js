var db = require("../models");

module.exports = function(app) {
  // users functions
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  app.get("/api/user/:userName", function(req, res) {
    db.User.findOne({ where: { userName: req.params.userName } }).then(function(
      user
    ) {
      res.json(user);
    });
  });

  // device functions
  app.get("/api/devices", function(req, res) {
    db.Device.findAll({}).then(function(devices) {
      res.json(devices);
    });
  });

  app.get("/api/device/:id", function(req, res) {
    db.Device.findOne({ where: { id: req.params.id } }).then(function(device) {
      res.json(device);
    });
  });

  app.post("/api/device", function(req, res) {
    db.Device.create(req.body).then(function(dbDevice) {
      res.json(dbDevice);
    });
  });

  // plant functions
  app.get("/api/plants", function(req, res) {
    db.Plant.findAll({}).then(function(plants) {
      res.json(plants);
    });
  });

  app.get("/api/plant/:id", function(req, res) {
    db.Plant.findOne({
      where: { id: req.params.id },
      include: [db.HistStats]
    }).then(function(plant) {
      res.json(plant);
    });
  });

  app.post("/api/plant", function(req, res) {
    db.Device.create(req.body).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  app.post("/api/histStat", function(req, res) {
    db.HistStat.create(req.body).then(function(dbHistory) {
      res.json(dbHistory);
    });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
