var expect = require("expect.js"),
    request = require("request"),
    SS = require("../lib/setServeur");

describe("Le serveur", function () {
  it("écoute sur un port", function (done) {
    SS.creeServeur(1789, function () {
      request
        .get("http://localhost:1789/")
        .on("response", function (response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

});
