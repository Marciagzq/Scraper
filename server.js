// DEPENDENCIES 
var express = require("express");
var logger = require("morgan");
var mongojs = require("mongojs");

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Initialize Express
var app = express();
 
// Selecting the Port 
var PORT = 3000;

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Scraper-News", { useNewUrlParser: true });


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
    axios.get("https://www.nytimes.com/section/sports").then(function(response) {
        // Shortcut 
    var $ = cheerio.load(response.data);

        $(".css-1l4spti").each(function(i, element) {
            var results = {};

            results.title = $(this)
            .children("a")
            .find("h2")
            .text();

            results.link = $(this)
            .children("a")
            .attr("href");

        db.Article.create(result)
        .then(function(dbArticle) {
            console.log(dbArticle)
        })
        .catch(function(dbArticle) {
            console.log(dbArticles)
         }) 
        })
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


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
