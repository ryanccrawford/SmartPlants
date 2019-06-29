var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
require("./setup");

var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/devices", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
  });

  afterEach(function() {
    db.User.destroy({
      where: {}
    });
  });

  it("should find all devices", function(done) {
    // Add some examples to the db to test with
    db.User.create({
      username: "user",
      email: "mail@mail.com",
      password: "password"
    })
      .then(function(dbUser) {
        db.Device.bulkCreate([
          {
            deviceName: "Test Device 1",
            UserId: dbUser.id,
            PlantId: 1
          },
          {
            deviceName: "Test Device 2",
            UserId: dbUser.id,
            PlantId: 2
          }
        ])
          .then(function() {
            // Request the route that returns all examples
            request.get("/api/devices").end(function(err, res) {
              var responseStatus = res.status;
              var responseBody = res.body;

              // Run assertions on the response

              expect(err).to.be.null;

              expect(responseStatus).to.equal(200);

              expect(responseBody)
                .to.be.an("array")
                .that.has.lengthOf(2);

              expect(responseBody[0])
                .to.be.an("object")
                .that.includes({
                  deviceName: "Test Device 1",
                  UserId: 1,
                  PlantId: 1
                });

              expect(responseBody[1])
                .to.be.an("object")
                .that.includes({
                  deviceName: "Test Device 1",
                  UserId: 1,
                  PlantId: 1
                });

              // The `done` function is used to end any asynchronous tests
              done();
            });
          })
          .catch(function() {
            done();
          });
      })
      .catch(function() {
        done();
      });
  });
});
