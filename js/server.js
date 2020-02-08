// import jQuery from 'jquery';

const express = require("express");
const app = express();
let imreoirData = [{province:"",
county:"",locationID:""},{}]
// const $ = jQuery;

//GET requests
app.get("/", function(req, res) {
	res.send("anseo");
});
app.get("/counties", function(req, res) {
	res.sendFile("countySelector.html", { root: '../public/'});
	res.sendFile("style.css", { root: '../css/'});
});
app.get("/locations", function(req, res) {
	
	res.json(imreoirData);
});
//use express.static
//to serve  “documentation.html” file from the public folder
app.use(express.static("public"));

//use the Morgan middleware library to log all requests
morgan = require("morgan");
app.use(morgan("common"));

app.get("/secreturl", function(req, res) {
	res.send("This is a secret url with super top-secret content.");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));