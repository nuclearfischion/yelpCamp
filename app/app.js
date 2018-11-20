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
var passport= require("passport");
var LocalStrategy= require("passport-local");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//express-fileupload stuff
const fileUpload = require("express-fileupload");
app.use(fileUpload());

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
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//require seeds file
var seedDB = require("../seeds");
seedDB();

//database of campgrounds STORED IN ARRAY; deprecated; moving everything to mongodb
//let campgrounds = [];

//******************************************CAMPGROUND ROUTES******************************************
app.get('/', function (req, res) {
  res.render('landing');
});

//INDEX
app.get("/campgrounds", function(req, res){
    // get all campgrounds from DB
    //find all campgrounds and pass results to callback function
    Campground.find({}, function(err, allCampgrounds){
        if(err)
            console.log("something has gone horribly, horribly wrong...");
        else
            res.render('index', {campgrounds: allCampgrounds });
    });
});
//NEW   -   form page; sends data to app.post campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW/EDIT  -   edit page for each campground site
app.get("/campgrounds/:campID/edit", function(req, res){
    let campID = req.params.campID;
    //find campground andit populate comments, then render edit page
    Campground.findById(campID).populate('comments').exec(function(err, retrievedCampground){
        if(err)
            console.log("couldn't find campground & populate comments");
        else{
            console.log("found and populated " + retrievedCampground);
            res.render('edit', {campground: retrievedCampground});            
        }
    });
});

//PUT
app.put("/campgrounds/:campID", function(req, res){
    let campID = req.params.campID;
    
    console.log("app.put is receiving the campID of: " + req.body.name);
    
    Campground.findByIdAndUpdate(campID, { $set: req.body}, { new: true }, function(err){
        if(err)
            console.log("shit went south");
        else
            return;
    });
    res.send("bitch");
});

//CREATE    -   the app.get route is different than this app.post route despite sharing names
app.post("/campgrounds", function(req, res){

//    console.log(req.files.campPhoto.name);

    //try to create campground; pass either error or result into callback
    Campground.create({
        name: req.body.name,
        image: req.body.image
        },
        function(err, newlyCreated){
            if(err)
                console.log("couldn't create campground");
            else
                console.log("a new campground named " + req.body.name + " has been added to the database.");
        });
    
    //redirect back to /campgrounds page
    res.redirect("/campgrounds");
    
});

//modify campgrounds
//app.put();

//delete campgrounds
app.delete("/campgrounds/:campID", function(req, res){
    let campID = req.params.campID;    

    //delete campground
    Campground.deleteOne({_id: campID}, function(err){
        if(err)
            console.log("problem deleting");
        else
            console.log("campground deleted");
    });

    res.send("got DELETE request");
});
//******************************************END CAMPGROUND ROUTES******************************************

//******************************************COMMENT ROUTES******************************************
//app.get();
app.post("/campgrounds/:campID/comments", function(req, res){
    let campID = req.params.campID;
    let commentText = req.body.commentText;
    //[x] create comment
    //[x] find campground
    //[x] push comment to found campground
    
    console.log("someone is trying to post a comment");
    console.log("commentText: " + req.body.commentText);
    //create comment
    Comment.create({text: commentText}, function(err, createdComment){
        if(err)
            console.log("couldn't create comment in mongodb");
        else{
            console.log("successfully added new comment to database!");
            //find campground
            Campground.findById(campID, function(err, retrievedCampground){
                if(err)
                    console.log("failed to find campground to push comment to");
                else{
                    console.log("found campground to push comment to: " + retrievedCampground.name);
                    retrievedCampground.comments.push(createdComment);
                    retrievedCampground.save();
                }
            });
        }
    });
    
    res.redirect("/campgrounds/" + campID + "/edit");
});
//******************************************END COMMENT ROUTES******************************************

//******************************************AUTH ROUTES******************************************
//register
app.get("/register", function(req, res){
	res.render("register");
});
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
			console.log("couldn't create new user!");
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//login
app.get("/login", function(req, res){
	res.render("login");
});
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
	console.log("logging in " + req.body.user.username);
	res.send("attempting to login...");
});
//******************************************END AUTH ROUTES******************************************


//listen!
app.listen(3000, function () {
  console.log('Yelp Camp is listening at http://localhost:3000');
});
