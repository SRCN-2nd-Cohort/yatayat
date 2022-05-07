const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const mapboxgl = require("mapbox-gl");
const https = require("https");
const { userInfo } = require("os");


const DB =
  "mongodb+srv://CSGroupSRCN:CSGroupSRCNxmap@cluster0.biuyk.mongodb.net/FindVehicleForYourRoute?retryWrites=true&w=majority";
mapboxAPI =
  "pk.eyJ1IjoibGFsaXR4MTciLCJhIjoiY2wyMzJzOWI4MGwwODNqbzFld2NyOGxoOCJ9.xXjxDFpc0Lg9xeexzEfbMA";
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

// Getting the latitude and longitude of the place
let place = "Minbhawan%2C%20Kathmandu";
const url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  place +
  ".json?worldview=cn&access_token=" +
  mapboxAPI +
  "";
/* getting the latitude and longitude of the place. */
https.get(url, function (response) {
  response.on("data", function (data) {
    const geoData = JSON.parse(data);
    locationArray = geoData.features[0].center;
    console.log(locationArray);
  });
});

const vehicleSchema = new mongoose.Schema({
  busName: String,
  lat: [Number],
  long: [Number],
});

/* const vehicleFare = new mongoose.Schema({}); */

const Vehicle = new mongoose.model("Vehicle", vehicleSchema);

/* const Fare = new mongoose.model("Fare", vehicleFare); */

app.get("/", function (req, res) {
  res.render("index", {
    yourLocation: "Your Location",
    yourDestination: "Your Destination",
  });

  Vehicle.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < docs.length; i++) {
        let latitudeMap = docs[i].lat;
        let longitudeMap = docs[i].long;
        for (let j = 0; j < latitudeMap.length; j++) {
          if (
            (locationArray[0] >= latitudeMap[j] - 0.005) &&
            (locationArray[0] <= latitudeMap[j] + 0.005)
          ) {
            if (
              (locationArray[1] >= longitudeMap[j] - 0.005) &&
              (locationArray[1] <= longitudeMap[j] + 0.005)
            ) {
              console.log(latitudeMap[j], longitudeMap[j], j);
            }
          }
        }
      }
    }
  });
});

app.post("/", function (req, res) {
  const yourLocation = req.body.yourLocation;
  const yourDestination = req.body.yourDestination;
});

app.post("/vehicles", function (req, res) {
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
});

app.listen(3000, function () {
  console.log("Server has started successfully.");
});
