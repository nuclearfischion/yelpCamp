//requirements and sets
var express = require('express');
var path = require('path');			//use views directory in different location than express default
var app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../views'));

//serve public directory
let publicPath = path.join(__dirname + '/../public');
app.use(express.static(publicPath));
console.log("the public directory path: " + publicPath);

//auth requirements
var passport 				= require("passport");
var LocalStrategy 			= require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");

//body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//express-fileupload stuff
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//flash messages
var flash = require("connect-flash");
app.use(flash());

//mongoose setup
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//require your campground schema/model!
var Campground 	= require("../models/campground");
var Comment 	= require("../models/comment");
var User 		= require("../models/user");

//passport configuration
app.use(require("express-session")({
	secret: "This can be anything. It's used to compute a hash for the session.",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass user data through every route
//pass flash message through every route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.message = req.flash("message", "You gotta log in bro.");
	next();
});

//require seeds file
var seedDB = require("../seeds");
seedDB();

//require & use routes
var campgroundRoutes 	= require("../routes/campgrounds"),
	commentRoutes 		= require("../routes/comments"),
	indexRoutes 		= require("../routes/index");

app.use("/campgrounds", campgroundRoutes);		//appends /campgrounds to campground routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

//listen!
app.listen(3000, function () {
  console.log('Yelp Camp is listening at http://localhost:3000');
});
