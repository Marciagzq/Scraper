function articleScraper() {
    $("#articleArea").empty();
    $.getJSON("/articles", function (data) {
        console.log(data)
        // For each one
        for (var i = 0; i < 10; i++) {
            // Display the apropos information on the page
            if (!data[i].savedState) {
                $("#articleArea").append(
                    "<div id='articleArea'> <div class='card'> <div class='card-header'> <h3 class='articleTitle'><a href=https://www.nytimes.com" + data[i].link + ">" + data[i].title + "</a></h3> <a class='btn btn-primary saverBtn' data-id=" + data[i]._id + ">Save Article</a></div><div class='card-body'><p class='card-text'>" + data[i].title +
                    "</p></div></div></div><br></br>"
                );
            }
        }
    });
}

$(document).on("click", "#scrapeBtn", function () {
    $("#articleArea").empty();
    $.ajax({
        url: "/scrape",
        method: "GET"
    }).then(function() {
        articleScraper();
    })
    
})

$(document).on("click", "#savedArticles", function(){
    $("#articleArea").empty();
    $.getJSON("/articles", function (data) {
        console.log(data)
        // For each one
        for (var i = 0; i < 10; i++) {
            // Display the apropos information on the page
            if (data[i].savedState) {
                $("#articleArea").append(
                    "<div id='articleArea'> <div class='card'> <div class='card-header'> <h3 class='articleTitle'><a href=https://www.nytimes.com" + data[i].link + ">" + data[i].title + "</a></h3> <a class='btn btn-primary noteBtn' data-id=" + data[i]._id + ">Create Note</a></div><div class='card-body'><p class='card-text'>" + data[i].title +
                    "</p></div></div></div><br></br>"
                );
            }
        }
    });
})

$(document).on("click", ".saverBtn", function () {
    let id = $(".saverBtn").data("id")
    let object = {
        savedState: true
    }

    $.ajax({
        url: "/articles/" + id,
        method: "PUT",
        data: object

    })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                if (!data[i].savedState) {
                    $("#articleArea").append(
                        "<div id='articleArea'> <div class='card'> <div class='card-header'> <h3 class='articleTitle'><a href=https://www.nytimes.com" + data[i].link + ">" + data[i].title + "</a></h3> <a class='btn btn-primary saverBtn' data-id=" + data[i]._id + ">Save Article</a></div><div class='card-body'><p class='card-text'>" + data[i].title +
                        "</p></div></div></div><br></br>"
                    );
                }
            }
        })
})