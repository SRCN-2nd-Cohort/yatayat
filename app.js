const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const DB = 'mongodb+srv://CSGroupSRCN:CSGroupSRCNxmap@cluster0.biuyk.mongodb.net/FindVehicleForYourRoute?retryWrites=true&w=majority';
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
// connecting the server to the mongo cloud atlas.
mongoose.connect(DB).then(() => {
  console.log("Connection Successful");
}).catch((err) => console.log("No connection"));



const mapSchema = new mongoose.Schema({
//write the format of the data to be stored...
});

const Map = new mongoose.model("Map", mapSchema);



app.get("/", function(req, res){
  res.render('index', {
    yourLocation: 'Your Location',
    yourDestination: 'Your Destination'
  });
})

app.post('/', function(req, res){
  const yourLocation = req.body.yourLocation;
  const yourDestination = req.body.yourDestination;

})



app.listen(3000, function() {
  console.log("Server has started successfully.")
});
