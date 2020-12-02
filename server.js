// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");
// this gives an id to the notes
const { v4: uuidv4 } = require("uuid");
// this sets up the express app
var app = express();
var PORT = process.env.PORT || 8080;
// allows the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// html route to get to notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// html route to get to index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// api route to get notes from the db.json file
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    return res.json(JSON.parse(data));
  });
});
// api route to post notes to the db.json file and then write them to the html page
app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();

  db.push(req.body);

  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    err ? console.error(err) : console.log("Success!")

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
      return res.json(JSON.parse(data));
    });
  });
});
// api route to delete notes from the db.json file and update the html
app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = req.params.id;

  fs.readFile("./db/db.json", (err, data) => {
    err ? console.error(err) : console.log("Success!1");

    for (var i = 0; i < db.length; i++) {
      if (db[i].id === deleteNote) {
        db.splice(db[i], 1);
      }
    }

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      err ? console.error(err) : console.log("Success!")

      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        }
        return res.json(JSON.parse(data));
      });
    });
  });
});
// html route to get to index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// this starts the server
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
