var express = require("express");
var router  = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

//POST - new comment
router.post("/create", isLoggedIn, function(req, res){
    let comment_id = req.params.id;
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
            Campground.findById(comment_id, function(err, retrievedCampground){
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
    
    res.redirect("/campgrounds/" + comment_id + "/edit");
});

//TODO: update/delete comment routes?
//edit form
// router.get("/:comment_id/edit", function(req, res){
//     let camp_id = req.params.id;
//     let commentText = req.body.commentText;

//     res.send("edit that comment!");
// });

router.put("/:comment_id", checkCommentOwnership, function(req, res){
    console.log("put route reached");
    let comment_id = req.params.comment_id;
    let comment_newText = req.body.text;
    console.log("req.body: " + JSON.stringify(req.body.text));
    
    Comment.findByIdAndUpdate(comment_id, {$set: {text: comment_newText}}, function(err, updatedComment){
        if(err)
            console.log(err);
        else
            console.log("HERE'S YOUR UPDATED COMMENT: " + updatedComment);    
        res.send("put route reached");    
    });
    
});

router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    comment_id = req.params.comment_id;
    console.log("comment id: " + comment_id);
    Comment.findByIdAndRemove(comment_id, function(err){
        if(err)
            console.log(err);
        else
            console.log("deleted comment!");
    });

    // TODO:
    // if(commentNotFound)
    //     res.status(400);
    
    res.send("comment delete route reached");
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
function checkCommentOwnership(req, res, next){
    console.log("checking if current user is authorized to edit/delete...");
    
    let comment_id = req.params.comment_id;
    console.log("comment id: " + comment_id);

    //if user is authenticated
        //check if user is comment author
    if(req.isAuthenticated()){
        console.log("current user: " + req.user.username);
        //find comment/author
        Comment.findById(comment_id, function(err, retrievedComment){
            if(err){
                console.log("couldn't find comment");
            }
            else{
                console.log("checking if current user is comment author...");
                // console.log("current user: " + req.user.username);
                // console.log("comment author: " + retrievedComment.author.username);
                if(req.user.username == retrievedComment.author.username){
                    console.log("yay, you can edit");
                    return next();     //stop further execution
                }
                else{
                    console.log("you don't have permission to do that");
                    res.status(403);    //forbidden
                    res.send("don't let this dork edit/delete");
                }
            }
        });
    }
    else{
        console.log("NO EDITING THIS COMMENT FOR YOU");
        res.status(401);    //unauthorized
        res.send("redirect this dork to the login screen");
    }
}

module.exports = router;
