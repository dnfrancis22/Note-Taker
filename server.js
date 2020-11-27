var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/api/config",(req, res) => {
//     res.json({success: true,});
// });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  