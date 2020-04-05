var fs = require("fs")
module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    fs.readFile("../Develop/db/db.json", function(err, data){
        if(err){
            res.status(500);
            return res.send("Sorry! There was an error.");
        }
        const gotNotes = JSON.parse(data);
        res.json(gotNotes)
    });
  });

  app.get("/api/notes/:id", function(req, res) {
    const index = parseInt(req.params.id);
    console.log(index);
  
    if (isNaN(index)) {
      res.status(400);
      return res.send("ID is not valid.");
    }
    fs.readFile("../Develop/db/db.json", function(err, data) {
      if (err) {
          console.log(err);
        res.status(500);
        return res.send("There was an error getting the note.");
      }
      const gotNotes = JSON.parse(data);
      if (index >= 0 && index < gotNotes.length) {
        gotNotes.res.json(gotNotes[index]);
      } else {
        res.status(404);
        return res.send("Could not find a note with that ID.");
      }
    });
  });

    app.post("/api/notes", function(req, res) {
    console.log(req.body);
    var note = req.body;
    fs.readFile("../Develop/db/db.json", function(err, data){
        if(err){
            res.status(500);
            return res.send("Sorry! There was an error.");
        }
        const notesArray = JSON.parse(data);
        notesArray.push(note)
        console.log(notesArray);
        fs.writeFile("../Develop/db/db.json", JSON.stringify(notesArray), function(err){
            if(err){
                res.status(500);
                return res.send("Sorry! There was an error.")
            }
            res.send("Your note has been added.")
        });
    });
});


  app.post("/api/notes/delete", function(req, res) {
    // Empty out the arrays of data
    console.log(res);
  });
};