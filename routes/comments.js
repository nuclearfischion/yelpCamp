var express = require("express");
var router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

//POST - new comment
router.post("/campgrounds/:campID/comments", isLoggedIn, function(req, res){
    let campID = req.params.campID;
    let commentText = req.body.commentText;
    //[x] create comment
    //[x] find campground
    //[x] push comment to found campground
    
    console.log("someone is trying to post a comment");
    // console.log("commentText: " + req.body.commentText);
    //create comment
    Comment.create({text: commentText}, function(err, createdComment){
        if(err)
            console.log("couldn't create comment in mongodb");
        else{
            //add username and id to comment
            createdComment.author.id = req.user.id;
            createdComment.author.username = req.user.username;
            createdComment.save();
            console.log("added comment by user id: " + createdComment.author.id);
            console.log("added comment by user: " + createdComment.author.username);
            console.log("The author of this comment is " + req.user.username);
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

//TODO: update/delete comment routes?

//middleware
function isLoggedIn(req, res, next){
    console.log("is authenticated = " + req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;