// DEPENDENCIES 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

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
mongoose.connect("mongodb://localhost/Scraper", { useNewUrlParser: true });


// Routes
// First Route ****

// Route get NEWS 
app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/section/sports").then(function(response) {
        // Shortcut 
    var $ = cheerio.load(response.data);

        $(".css-1l4spti").each(function(i, element) {
            // Empty object to save results
            var result = {};

            result.title = $(this)
            .children("a")
            .find("h2")
            .text();
            // console.log(result.title)

            result.link = $(this)
            .children("a")
            .attr("href");
            // console.log(result.link)

            result.image = $(this)
            .children("a")
            .find("figure")
            .attr("itemid");
            // console.log(result.image)


        db.Article.create(result)
        .then(function(dbArticle) {
            console.log(dbArticle)
        })
        .catch(function(err) {
            console.log(err)
         }) 
        })
        // Message to user
        res.send("Scrape Complete");
    });
});


// Route to find the Articles
app.get("/articles", function(req, res) {
    db.Article.find({}, function(err, response) {
        if(err){
            console.log(err)
        }else{
            console.log(response);
            res.send(response);
        }
    });
});


// Route to saved Articles
app.get("/saved", function(req, res) {
    db.Article.find({
        // saved:true?
    })
    .populated("note")
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err)
    });
});

// app.post ************



// Route to save or update a note
app.get("/note/:id", function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate( { _id: req.params.id }, { note: dbNote._id }, { new: true } );
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function() {
            res.json(err);
        });
});


// 
app.post("/note/:id", function(req, res) {
    db.Article.remove(
        {
            _id: db.Article.ObjectID(req.params.id)
        },
        // Check if any error from the db  
        function(error, removed) {
            if(error){
                console.log(error);
                res.send(error);
            // if there's no errors, remove the note.
            }else {
                console.log(removed);
                res.send(removed);
            }
        }
    )
});



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
})
