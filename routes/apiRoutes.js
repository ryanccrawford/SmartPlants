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

  app.post("/api/user", function(req, res) {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).end();
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
    console.log(req.body);
    if (!("UserId" in req.body)) {
      console.log("bad request - UserId not included");
      res.status(400).end();
    } else {
      db.Device.create(req.body)
        .then(function(dbDevice) {
          res.json(dbDevice);
        })
        .catch(function(err) {
          console.log(err);
          res.status(400).end();
        });
    }
  });

  // plant functions
  app.get("/api/plants", function(req, res) {
    db.Plant.findAll({}).then(function(plants) {
      res.json(plants);
    });
  });

  app.get("/api/plant/:id", function(req, res) {
    db.Plant.findOne({
      where: { id: req.params.id }
    }).then(function(plant) {
      res.json(plant);
    });
  });

  app.post("/api/plant", function(req, res) {
    db.Device.create(req.body).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  app.get("/api/live/:time?", function(req, res) {
    // check for time = null
    db.LiveStat.findAll({
      where: { timeStamp: req.params.time } // find doc for greater than
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/liveStat", function(req, res) {
    db.LiveStat.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/histStat", function(req, res) {
    db.HistStat.create(req.body).then(function(dbHistory) {
      res.json(dbHistory);
    });
  });
};
