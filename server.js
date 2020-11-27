var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config",(req, res) => {
    res.json({success: true,});
});

app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  