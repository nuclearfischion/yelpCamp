let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//schema
let userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);

//model
let User = mongoose.model("User", userSchema);

//export
module.exports = User;