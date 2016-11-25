SS = require("./lib/setServeur");

port = process.env.PORT || 3000;
scoreur = SS.creeScoreur();
SS.creeServeur(port, scoreur, function () {
  console.log("Listening on ", port);
}, true);
