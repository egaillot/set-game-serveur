var expect = require("expect.js"),
    request = require("request"),
    SS = require("../lib/setServeur");

describe("Le serveur", function () {
  var serveur, fauxScoreur;

  beforeEach(function (done) {
    fauxScoreur = {}
    serveur = SS.creeServeur(1789, fauxScoreur, function () {
      done();
    });
  });

  afterEach(function (done) {
    serveur.eteinsToi(function () {
      done();
    });
  });

  it("écoute sur un port", function (done) {
    request("http://localhost:1789/", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("donne le score d'un joueur", function (done) {
    fauxScoreur.score = function (idJoueur) {
      if (idJoueur === "12345") return "42";
    };

    request("http://localhost:1789/player/12345/score", function (err, res, body) {
        expect(body).to.equal("42");
        done();
    });
  });
});

describe("Le scoreur", function () {
  it("retourne 0 s'il ne connaît pas le joueur", function () {
    scoreur = SS.creeScoreur();
    expect(scoreur.score("inconnu")).to.equal("0");
  });
});
