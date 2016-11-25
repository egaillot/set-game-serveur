SS = require("./lib/setServeur");

port = process.env.PORT || 3000;
SS.creeServeur(port, function () {
  console.log("Listening on ", port);
});
