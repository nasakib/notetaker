var path = require("path");
var fs = require("fs")

module.exports = function(app) {
  app.get("/notes", function(req, res) {
    res.fs.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.fs.sendFile(path.join(__dirname, "../Develop/public/index.html"));
  });
};