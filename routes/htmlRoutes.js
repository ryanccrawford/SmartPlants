var db = require("../models");

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

  app.get("/plantDevices#addDevice", function(req, res) {
    $(".modal").modal();
    res.send("hi");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render plant page - Will add ID later
  app.get("/plant/:id", function(req, res) {
    res.render("plant", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
