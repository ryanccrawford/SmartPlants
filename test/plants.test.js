var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
require("./setup");

var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("Plant Test", function() {
  beforeEach(function() {
    request = chai.request(server);
    //return db.sequelize.sync({ force: true });
  });

  afterEach(function() {
    db.User.destroy({
      where: {}
    });
  });

  it("should retrieve all plants", function(done) {
    // Add some examples to the db to test with
    db.User.create({
      username: "user",
      email: "mail@mail.com",
      password: "password"
    })
      .then(function(dbUser) {
        db.Device.create({
          deviceName: "Test Device 1",
          UserId: dbUser.id,
          PlantId: 1
        })
          .then(function(dbDevice) {
            db.Plant.bulkCreate([
              { plantName: "Jane Doe", deviceId: dbDevice.id },
              { plantName: "John Doe", deviceId: dbDevice.id }
            ])
              .then(function() {
                request.get("/api/plants").end(function(err, res) {
                  var responseStatus = res.status;
                  //var responseBody = res.body;

                  // Run assertions on the response

                  expect(err).to.be.null;

                  expect(responseStatus).to.equal(200);

                  // expect(responseBody)
                  //   .to.be.an("array")
                  //   .that.has.lengthOf(2);

                  // expect(responseBody[0])
                  //   .to.be.an("object")
                  //   .that.includes({
                  //     text: "First Example",
                  //     description: "First Description"
                  //   });

                  // expect(responseBody[1])
                  //   .to.be.an("object")
                  //   .that.includes({
                  //     text: "Second Example",
                  //     description: "Second Description"
                  //   });

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
      })
      .catch(function() {
        done();
      });
  });
});
