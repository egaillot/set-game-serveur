var http = require("http");

var creeServeur = function (port, scorer, cb) {
  var extraisIdJoueurDeRoute = function (url) {
    var routeScoreJoueur = new RegExp("/player/(.*)/score"),
        match;

    if (match = routeScoreJoueur.exec(url)) return match[1];
    return null;
  }

  var serveur = http.createServer(function (req, res) {
    var idJoueur = extraisIdJoueurDeRoute(req.url);

    if (req.method === "POST" && idJoueur) {
      scorer.incrementeScore(idJoueur);
      res.statusCode = 204;
      res.end();
    }
    else if (idJoueur) {
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
