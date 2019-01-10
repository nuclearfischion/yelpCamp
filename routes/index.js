var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");

//landing page
router.get('/', function (req, res) {
  res.render('landing');
});

//******************************************AUTH ROUTES******************************************
//register
router.get("/register", function(req, res){
	res.render("register");
});
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
      req.flash("error", "Error. " + err.message + ".");
      res.redirect("/register");
    }

    passport.authenticate("local")(req, res, function(){
      console.log("new user " + user.username + " created");
      req.flash("success", "Success! You just created your account. Welcome to YelpCamp, " + user.username + ".");
			res.redirect("/campgrounds");
		});
	});
});

//login form
router.get("/login", function(req, res){
	res.render("login");
});
//login post
router.post('/login',
  // wrap passport.authenticate call in a middleware function
  function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log("error: " + error);
      console.log("user: " + user);
      console.log("info: " + info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        req.flash("error", "The information you entered doesn't match our records.");
        // res.status(401).send(info);
      } else {
        req.login(user, function(err){
          if(err){
  				  console.log("couldn't log user in");
          }
  			else
  				console.log("logged user in: " + user.username);
      	});
        next();
      }

      // res.status(401).send(info);
      res.redirect("/login");
    })(req, res);
  },

  // function to call once successfully authenticated
  function (req, res) {

    req.flash("success", "You have logged in successfully. Welcome back, " + req.user.username + ".");
    res.redirect("/campgrounds");
  });

//logout
router.get("/logout", function(req, res){
	req.logout();

  req.flash("success", "You have logged out successfully.");
	res.redirect("/campgrounds");
});
//******************************************END AUTH ROUTES******************************************

module.exports = router;