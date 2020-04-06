var fs = require("fs")

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    fs.readFile("./Develop/db/db.json", "utf8", function(err, data){
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
    fs.readFile("./Develop/db/db.json", function(err, data) {
      if (err) {
          console.log(err);
        res.status(500);
        return res.send("There was an error getting the note.");
      }
      const gotNotes = JSON.parse(data);
      if (index >= 0 && index < gotNotes.length) {
        res.json(gotNotes[index]);
      } else {
        res.status(404);
        return res.send("Could not find a note with that ID.");
      }
    });
  });

    app.post("/api/notes", function(req, res) {
    console.log(req.body);
    var note = req.body;
    fs.readFile("./Develop/db/db.json", "utf8", function(err, data){
        if(err){
            res.status(500);
            return res.send("Sorry! There was an error.");
        }
        var notesArray = JSON.parse(data);
        notesArray.push(note);
        // res.json(notesArray)
        console.log(notesArray);
        fs.writeFile("./Develop/db/db.json", JSON.stringify(notesArray), function(err){
            if(err){
                res.status(500);
                return res.send("Sorry! There was an error.")
            }
            res.send("Your note has been added.")
        });
    });
});

  app.put("/api/notes/:id", function(req, res) {
    const index = parseInt(req.params.id);  
    fs.readFile("./Develop/db/db.json", function(err, data) {
      if (err) {
        console.log(err);
        res.status(500);
      }
      let gotNotes = JSON.parse(data);
      if (index >= 0 && index < gotNotes.length) {
          gotNotes.map((object, index) => {
            return Object.assign(object, {id: index + 1});
          });
      }else{
        res.status(404);
        return res.send("Could not find a note with that ID.");
      }
    });
  });

 app.delete("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    const index = parseInt(req.params.id);  
    if (isNaN(index)) {
      res.status(400);
      return res.send("ID is not valid. Either does not exist or is not a number.");
    }
    fs.readFile("./Develop/db/db.json", "utf8", function(err, data) {
      if (err) {
          console.log(err);
        res.status(500);
        return res.send("There was an error getting the note.");
      }
      const gotNotes = JSON.parse(data);
      if (index >= 0 && index < gotNotes.length) {
        gotNotes.splice(gotNotes[index]);
        gotNotes.map((object, index) => {
          return Object.assign(object, { id: index + 1 });
        })
        }
       else {
        res.status(404);
        return res.send("Could not find a note with that ID.");
      }
    });
  });
};

//var json = { ... };
//var key = "foo";
//delete json[key]; // Removes json.foo from the dictionary.

// for (i=0; i < gotNotes.length; i++){
//   Object.assign(gotNotes, {id: gotNotes.length})
//   fs.writeFile("../Develop/db/db.json", JSON.stringify(notesArray));
// }

// if (index >= 0 && index < gotNotes.length) {
//   for (i=0; i < gotNotes.length; i++){
//   gotNotes = `${gotNotes[index]}id:${index}`
//   fs.writeFile("../Develop/db/db.json", JSON.stringify(gotNotes));
// }
// }