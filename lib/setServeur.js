var http = require("http");

var creeServeur = function (port, scorer, cb) {
  var serveur = http.createServer(function (req, res) {
    var routeScoreJoueur = new RegExp("/player/(.*)/score"),
        match;
    if (req.method === "POST" && (match = routeScoreJoueur.exec(req.url))) {
      scorer.incrementeScore(match[1]);
      res.statusCode = 204;
      res.end();
    }
    else if (match = routeScoreJoueur.exec(req.url)) {
      var idJoueur = match[1];
      var score = scorer.score(idJoueur);
      res.end(score);
    } else {
      res.end("Set Game - Score Service");
    }
  });
  serveur.listen(port, cb);
  return {
    eteinsToi: function (cb) {
      serveur.close(cb);
    }
  };
};

creeScoreur = function () {
  var scores = {},

      initialiseSiNecessaire = function (idJoueur) {
        scores[idJoueur] = scores[idJoueur] || 0;
      };

  return {
    score: function (idJoueur) {
      initialiseSiNecessaire(idJoueur);
      return "" + scores[idJoueur];
    },

    incrementeScore: function (idJoueur) {
      initialiseSiNecessaire(idJoueur);
      scores[idJoueur] += 1;
    }
  };
};

module.exports = {
  creeServeur: creeServeur,
  creeScoreur: creeScoreur
};
