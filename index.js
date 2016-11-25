SS = require("./lib/setServeur");

port = process.env.PORT || 3000;
fauxScorer = { score: function () {return "0";} };
SS.creeServeur(port, fauxScorer, function () {
  console.log("Listening on ", port);
});
