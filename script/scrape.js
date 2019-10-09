var axios = require("axios") 
var cheerio = require("cheerio") 


function scrape(cb) {
    axios.get("https://www.nytimes.com/section/sports").then(function(response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each element with a "title" class
        var results = [];
        
        $(".css-1l4spti").each(function(i, element) {
          // Save the text and href of each link enclosed in the current element
          var title = $(element).children("a").find("h2").text();
          var link = "https://www.nytimes.com" + $(element).children("a").attr("href");
            // console.log(title);
            // console.log(link);
          // If this found element had both a title and a link
          if (title && link) {
              results.push({
                  title, 
                  link
                });

            // Insert the data in the scrapedData db
                        // db.scrapedData.insert({
                        //   title: title,
                        //   link: link
                        // },
                        // function(err, inserted) {
                        //   if (err) {
                        //     // Log the error if one is encountered during the query
                        //     console.log(err);
                        //   }
                        //   else {
                        //     // Otherwise, log the inserted data
                        //     console.log(inserted);
                        //   }
                        // });
          }
        });
        console.log("Scrape complete");
        cb(results);
      });
      // Send a "Scrape Complete" message to the browser
    //   res.send("Scrape Complete");
    
}

module.exports = scrape;