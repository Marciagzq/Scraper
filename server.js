// DEPENDENCIES 
var express = require("express") 
var mongojs = require("mongojs") 


// Importing the logic from script folder
var scrape = require("./script/scrape.js");

// installed!

// Initialize Express
var app = express();
 
// Set static folder to fetch the folder "public"
app.use(express.static("public"));

// Database configuration
var databaseUrl = "scraper";
var collections = ["srapedData"];

// Configuration of package mongojs to the db variable 
var db = mongojs(databaseUrl, collections);

// Watching out for errors
db.on("error", function(err) {
    console.log("Database Error :", err);
});

// Routes
// First Route ****
app.get("/", function(req, res) {
    res.send("Welcome to Scrape");
});


// Route get NEWS 
app.get("/scrape", function(req, res) {
    scrape(function(response) { 
        res.json(response);
    })
});


// app.put? app.update?
app.delete("/scrape", function(req, res) {

})

// Route get all JSON ****
app.get("/all", function(req, res) {
    db.scraped.find(), function(err, found) {
        if(err) {
            console.log(err);
        }else{
            res.json(found);
        }
    }
});


// Lister the server 
app.listen(3000, function() {
    console.log("App running on 3000");
})
