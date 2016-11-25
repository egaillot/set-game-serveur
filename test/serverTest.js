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

  it("incrémente le score d'un joueur", function (done) {
    idJoueurAppele = 0;
    fauxScoreur.incrementeScore = function (idJoueur) {
      idJoueurAppele = idJoueur;
    };

    request.post("http://localhost:1789/player/12345/score", function (err, res) {
      expect(res.statusCode).to.equal(204);
      expect(idJoueurAppele).to.equal("12345");
      done();
    });
  });

  it("initialise le score à zéro au démarrage d'une partie", function (done) {
    var idJoueurAppele = null;
    fauxScoreur.demarrePartie = function (idJoueur) {
      idJoueurAppele = idJoueur;
    };

    request.post("http://localhost:1789/player/12345/start", function (err, res) {
      expect(res.statusCode).to.equal(204);
      expect(idJoueurAppele).to.equal("12345");
      done();
    });


  });
});

describe("Le scoreur", function () {
  it("retourne 0 s'il ne connaît pas le joueur", function () {
    scoreur = SS.creeScoreur();
    expect(scoreur.score("inconnu")).to.equal("0");
  });

  it("maintient l'état des scores", function () {
    scoreur = SS.creeScoreur();
    scoreur.incrementeScore("12345");
    expect(scoreur.score("12345")).to.equal("1");
  });

  it("sait redémarrer une partie", function () {
    scoreur = SS.creeScoreur();
    scoreur.incrementeScore("12345");
    scoreur.demarrePartie("12345");
    expect(scoreur.score("12345")).to.equal("0");
  });
});
