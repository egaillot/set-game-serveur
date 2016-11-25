var http = require("http");

var creeServeur = function (port, cb) {
  serveur = http.createServer(function (req, res) {
    res.end("Set Game - Score Service");
  });
  serveur.listen(port, cb);
};

module.exports = {
  creeServeur: creeServeur
};

