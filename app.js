const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
})




app.listen(3000, function() {
  console.log("Server has started successfully.")
})
