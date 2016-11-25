var http = require("http");

var creeServeur = function (port, scorer, cb) {
  var serveur = http.createServer(function (req, res) {
    var routeScoreJoueur = new RegExp("/player/(.*)/score"),
        match;
    if (match = routeScoreJoueur.exec(req.url)) {
      var idJoueur = match[1];
      var score = scorer.score(idJoueur);
      res.end(score);
    } else {
      res.end("Set Game - Score Service");
    }
  });
  serveur.listen(port, cb);
};

creeScoreur = function () {
  return {
    score: function (idJoueur) {
      return "0";
    }
  };
};

module.exports = {
  creeServeur: creeServeur,
  creeScoreur: creeScoreur
};

