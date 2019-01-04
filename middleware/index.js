var Campground = require("../models/campground");
var Comment = require("../models/comment");

//middleware goes here
var middlewareObj = {};

//check if a user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    console.log("is authenticated = " + req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//checks if a user is logged in and compares current user with campground owner
middlewareObj.checkCampgroundOwnership = function(req, res, next){
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
};

//checks if a user is logged in and compares current user with campground owner
middlewareObj.checkCommentOwnership = function(req, res, next){
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
};

module.exports = middlewareObj;
