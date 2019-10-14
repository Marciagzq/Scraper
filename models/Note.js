// npm mongoose package *INSTALL REQ*
var mongoose = require("mongoose");

//Save the schema constructor to easy access
var Schema = mongoose.Schema;

// New Schema Constructor object
var NoteSchema = new Schema ({
    type: String,
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
