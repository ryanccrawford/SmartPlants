var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});
