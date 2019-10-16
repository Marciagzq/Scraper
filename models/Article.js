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
    image: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
            // TO CHECK THIS UP *********
                        //     type: Boolean,
                        //     default: false
                    
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;