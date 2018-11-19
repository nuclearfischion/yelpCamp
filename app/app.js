//requirements and sets
var express = require('express');
var app = express();
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//express-fileupload stuff
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//mongoose setup
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//require your campground schema/model!
var Campground = require("../models/campground");

//require comment schema/model!
let Comment = require("../models/comment");

//require seeds file
var seedDB = require("../seeds");
seedDB();

//serve public directory
var path = require("path");
let publicPath = path.join(__dirname + '/../public');
app.use(express.static(publicPath));
console.log("the directory name is: " + publicPath);

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
    //get data and push to campgrounds array
//    let newCampground = {};
//    newCampground.name = req.body.name;
//    newCampground.image = req.body.image;
//    console.log(newCampground);
//    campgrounds.push(newCampground);

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
//listen!
app.listen(3000, function () {
  console.log('Yelp Camp is listening!');
});
