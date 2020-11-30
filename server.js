var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");
//uuid
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4())

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
      console.error(err)
    }
    return res.json(JSON.parse(data));

    console.log(data)
  });
});
app.post("/api/notes", (req, res) => {
    //data passed in in an obj(bodyparser=>req.body) that contains title and text
    //once I get my data what do we do
    //save it to json file db (array of objects).
    //push it (obj) into the array
    //update the obj with an id
    req.body.id = uuidv4();
    db.push(req.body)
    console.log(db)
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) =>
  err ? console.error(err) : console.log('Success!')
  
);

//for delete you will need to look through your array for a match, once you get it 
//get the index location to remove the item (splice)
//req.params


    
  });
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
