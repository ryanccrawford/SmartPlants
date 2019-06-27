var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("userInsertTest", function() {
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should retrieve all users", function(done) {
    // Add some examples to the db to test with
    db.User.bulkCreate([
      { userName: "Jane Doe", email: "jdoe2@test.com", password: "p@55w0rd" },
      { userName: "John Doe", email: "jdoe@test.com", password: "p@55w0rd" }
    ]).then(function() {
      request.get("/api/users").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

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
    });
  });
});
