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
router.post("/", isLoggedIn, function(req, res){

//    console.log(req.files.campPhoto.name);

    //try to create campground; pass either error or result into callback
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
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
    //TODO: authorization
    //if user is logged in
        //check if user owns the campground; if yes, allow edit
        //if not; show "NO EDITING PRIVILEGES"
    //if not, redirect

    // if(req.isAuthenticated())
    //     console.log();
    // else{
    //     console.log("YOU NEED TO BE LOGGED IN TO EDIT/DELETE");
    //     res.send("YOU NEED TO BE LOGGED IN TO EDIT/DELETE");
    // }

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
//TODO: authorization! current user id must match campground author id
router.put("/:campID", checkCampgroundOwnership, function(req, res){
    console.log("hey you reached the put route");
    let campID = req.params.campID;
    
    console.log("app.put is receiving the campID of: " + req.body.name);
    console.log("req.body is " + req.body);
    console.log("req.data is " + req.data);
    
    Campground.findByIdAndUpdate(campID, { $set: req.body}, { new: true }, function(err){
        if(err){
            console.log("couldn't update campground");
        }
        else{
            console.log("updated campground");
        }
        res.send("updated");    
    });
});


//DELETE campgrounds
//TODO: authorization! current user id must match campground author id
router.delete("/:campID", checkCampgroundOwnership, function(req, res){
    console.log("attempting to delete campground");
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

//is authorized
function checkCampgroundOwnership(req, res, next){
    console.log("checking if current user is authorized to edit/delete...");
    
    let campID = req.params.campID;
    console.log("campground id: " + campID);

    //if user is authenticated
        //check if user is campground author
    if(req.isAuthenticated()){
        console.log("current user: " + req.user.username);
        //find campground/author
        Campground.findById(campID, function(err, retrievedCampground){
            if(err){
                console.log("couldn't find campground");
            }
            else{
                console.log("checking if current user is campground author...");
                // console.log("current user: " + req.user.username);
                // console.log("campground author: " + retrievedCampground.author.username);
                if(req.user.username == retrievedCampground.author.username){
                    console.log("yay, you can edit");
                    return next();     //stop further execution
                }
                else{
                    console.log("you don't have permission to do that");
                    res.status(400);
                    res.send("don't let this dork edit/delete");
                }
            }
        });
    }
    else{
        console.log("NO EDITING THIS CAMPGROUND FOR YOU");
        res.send("redirect this dork to the login screen");
    }
}

module.exports = router;