let mongoose = require("mongoose");

//schema
let commentSchema = new mongoose.Schema({
    text: String,
    author: { 
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
	 }
});

//model
let Comment = mongoose.model("Comment", commentSchema);

//export
module.exports = Comment;