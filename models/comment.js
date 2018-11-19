let mongoose = require("mongoose");

//schema
let commentSchema = new mongoose.Schema({
    text: String,
    author: { type: String, default: 'Anonymous' }
});

//model
let Comment = mongoose.model("Comment", commentSchema);

//export
module.exports = Comment;