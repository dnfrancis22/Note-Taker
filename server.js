var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");
//uuid
const { v4: uuidv4 } = require("uuid");
console.log(uuidv4());

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    return res.json(JSON.parse(data));

    console.log(data);
  });
});
app.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  db.push(req.body);
  console.log(db);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) =>
    err ? console.error(err) : console.log("Success!")
  );
});
//for delete you will need to look through your array for a match, once you get it
//get the index location to remove the item (splice)
//req.params
app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = req.params.id;

  fs.readFile("./db/db.json", (err, data) => {
    err ? console.error(err) : console.log("Success!1");
    // db = JSON.parse(data);
    for (var i = 0; i < db.length; i++) {
      if (db[i].id === ":id") {
        db.splice(db[i]);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) =>{
    err ? console.error(err) : console.log("Success!2")
    });
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
