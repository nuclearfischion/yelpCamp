//middleware goes here

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    console.log("is authenticated = " + req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
middlewareObj.checkCampgroundOwnership = function(){};
middlewareObj.checkCommentOwnership = function(){};

module.exports = middlewareObj;
