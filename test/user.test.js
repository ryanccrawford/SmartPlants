var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
require("./setup");

var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("userTests", function() {
  beforeEach(function() {
    request = chai.request(server);
  });

  afterEach(function() {
    db.User.destroy({
      where: {}
    });
  });

  it("should insert new users", function(done) {
    var reqBody = {
      userName: "Jane Doe",
      email: "jdoe2@test.com",
      password: "p@55w0rd"
    };

    // POST the request body to the server
    request
      .post("/api/user")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should retrieve all users", function(done) {
    // Add some examples to the db to test with
    db.User.bulkCreate([
      { userName: "Jane Doe", email: "jdoe2@test.com", password: "p@55w0rd" },
      { userName: "John Doe", email: "jdoe@test.com", password: "p@55w0rd" }
    ])
      .then(function() {
        request.get("/api/users").end(function(err, res) {
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
              userName: "Jane Doe",
              email: "jdoe2@test.com",
              password: "p@55w0rd"
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              userName: "John Doe",
              email: "jdoe@test.com",
              password: "p@55w0rd"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      })
      .catch(function() {
        done();
      });
  });
});
