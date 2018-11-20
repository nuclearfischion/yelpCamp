let mongoose = require("mongoose");

//schema
let userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//model
let User = mongoose.model("User", userSchema);

//export
module.exports = User ;