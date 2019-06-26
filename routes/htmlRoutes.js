//var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("landing");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/plantDevices", function(req, res) {
    res.render("plantDevices");
  });

  // Render plant page - Will add ID later
  app.get("/plant/:id", function(req, res) {
    res.render("plant", {});
  });

  app.get("/api/device", function(req, res) {
    res.send(req.body);
  });
  // Render 404 page for any unmatched routes
};
