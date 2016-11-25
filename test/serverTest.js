var expect = require("expect.js"),
    request = require("request"),
    SS = require("../lib/setServeur");

describe("Le serveur", function () {
  it("écoute sur un port", function (done) {
    SS.creeServeur(1789, {}, function () {
      request("http://localhost:1789/", function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  it("donne le score d'un joueur", function (done) {
    var scorer = {
      score: function (idJoueur) {
        if (idJoueur === "12345") {
          return "42";
        }
      }
    };
    SS.creeServeur(2607, scorer, function () {
      request("http://localhost:2607/player/12345/score", function (err, res, body) {
          expect(body).to.equal("42");
          done();
        });
    });
  });
});
