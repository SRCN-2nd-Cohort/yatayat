const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const https = require("https");
const axios = require("axios");
require('dotenv').config();

const DB = process.env.DATABASE_CONNECT;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// connecting the server to the mongo cloud atlas.
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log("No connection"));


const vehicleSchema = new mongoose.Schema({
  busName: String,
  lat: [Number],
  long: [Number],
  routeName: String
});

/* const vehicleFare = new mongoose.Schema({}); */
/* const Fare = new mongoose.model("Fare", vehicleFare); */


const Vehicle = new mongoose.model("Vehicle", vehicleSchema);



app.get("/", function (req, res) {
  res.render("index", {
    busesList: "Waiting.........",
    busesRoute:"Waiting........."
  });


});




app.post("/", function(req, res){
  let distance = req.body.distance;
  let originLat = req.body.originLat;
  let originLong = req.body.originLong;
  let destinationLat = req.body.destinationLat;
  let destinationLong = req.body.destinationLong;
  console.log(originLat, originLong, destinationLat, destinationLong);
  var buses = [];
  var busesRoute = [];
  Vehicle.find({}, function(err, docs){
    if (err){
      console.log(err);
    }else{
      for (let i = 0; i < docs.length; i++){
        var state = false;
        var latitudeMap = docs[i].lat;
        var longitudeMap = docs[i].long;
        for (let j = 0; j < latitudeMap.length; j++){
          if (
            (originLat >= latitudeMap[j] - 0.005) &&
            (originLat <= latitudeMap[j] + 0.005)
          ){
            if (
              (originLong >= longitudeMap[j] - 0.005) &&
              (originLong <= longitudeMap[j] + 0.005)
            ){
              for (let k = 0; k < latitudeMap.length; k++){
                if (
                  (destinationLat >= latitudeMap[k] - 0.005) &&
                  (destinationLat <= latitudeMap[k] + 0.005)
                ){
                  if ((destinationLong >= longitudeMap[k] - 0.005) &&
                  (destinationLong <= longitudeMap[k] + 0.005)){
                    buses.push(docs[i].busName);
                    console.log(buses);
                    busesRoute.push(docs[i].routeName);
                    state = true;
                    break;
                  }
                }                
              }
              if (state){
                break;
              }
            }
          }

        }
      }
    }
    if (buses.length === 0){
      buses.push("Sorry! we don't know any of the vehicle in that route")
    }
    res.render("index",{
      busesList: buses,
      busesRoute: busesRoute
    })
  });
  });

  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }

app.listen(port, function () {
  console.log("Server has started successfully.");
});



/*  Vehicle.find({}, function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < docs.length; i++) {
      let latitudeMap = docs[i].lat;
      let longitudeMap = docs[i].long;
      for (let j = 0; j < docs.length; j++) {
        if (
          (locationArray[0] >= latitudeMap[j] - 0.005) &&
          (locationArray[0] <= latitudeMap[j] + 0.005)
        ) {
            if (
              (locationArray[1] >= longitudeMap[j] - 0.005) &&
              (locationArray[1] <= longitudeMap[j] + 0.005)
            ) {

            }
          }
        }
      }
    }
  }
);  
 */



/* app.post("/vehicles", function (req, res) {
  const newVehicle = new Vehicle({
    busName: req.body.busName,
    lat: req.body.lat,
    long: req.body.long,
  });
  newVehicle.save(function (err) {
    if (!err) {
      res.send("Successfully added the data");
    } else {
      res.send(err);
    }
  });
}); */