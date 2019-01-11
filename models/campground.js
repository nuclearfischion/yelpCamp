let mongoose = require("mongoose");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: {type: String, default: "99"},
    author: {
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	}, 
    	username: String
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});
// compile schema into a Model
let Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;