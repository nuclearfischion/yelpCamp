var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);

//model
var User = mongoose.model("User", userSchema);

//export
module.exports = User;