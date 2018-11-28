var express = require("express");
var router  = express.Router();

var Campground = require("../models/campground");
/***
notes:
    * any reference to "app" refers to the express app object in app.js.
    * in this file, router fulfils the same purpose as app.
    * Router is like a mini express application. It doesn't bring in views or settings, 
        but provides us with the routing APIs like .use, .get, .param, and route.
***/

//INDEX
router.get("/", function(req, res){
    // get all campgrounds from DB
    //find all campgrounds and pass results to callback function
    Campground.find({}, function(err, allCampgrounds){
        if(err)
            console.log("could not find a campground");
        else
            res.render('index', {campgrounds: allCampgrounds });
    });

    //show current logged in user
    if(req.user)
        console.log(req.user.username + " is visiting /campgrounds");
});
//NEW   -   form page; sends data to app.post campgrounds
router.get("/new", isLoggedIn, function(req, res){
    res.render("new.ejs");
});
//CREATE    -   the app.get route is different than this app.post route despite sharing names
router.post("/", function(req, res){

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

//SHOW/EDIT  -   edit page for each campground site
router.get("/:campID/edit", function(req, res){
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

//UPDATE/PUT
router.put("/:campID", function(req, res){
    let campID = req.params.campID;
    
    console.log("app.put is receiving the campID of: " + req.body.name);
    
    Campground.findByIdAndUpdate(campID, { $set: req.body}, { new: true }, function(err){
        if(err)
            console.log("couldn't update campground");
        else
            return;
    });
    res.send("campground edit page");
});


//DELETE campgrounds
router.delete("/:campID", function(req, res){
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

//middleware
function isLoggedIn(req, res, next){
    console.log("is authenticated = " + req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;