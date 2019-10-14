// npm mongoose package *INSTALL REQ*
var mongoose = require("mongoose");

//Save the schema constructor to easy access
var Schema = mongoose.Schema;

// New Schema Constructor object
var ArticleSchema = new Schema ({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        // TO CHECK THIS UP
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;