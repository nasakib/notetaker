var express = require("express")
var app = express();
var path = require("path");

var PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../Develop/public/')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./apiRoutes")(app);
require("./htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});