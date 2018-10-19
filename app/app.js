
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

//database of campgrounds STORED IN ARRAY; deprecated; moving everything to mongodb
//let campgrounds = [];
// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
// compile schema into a Model
let Campground = mongoose.model("Campground", campgroundSchema);

// here I created some sample campgrounds; only run once so we don't duplicate documents
//Campground.create(
//    {
//        name: "Salmon Creek",
//        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=384a51f2b8eaff486e080f101afc8192&auto=format&fit=crop&w=635&q=80"
//    },
//    {
//        name: "Granite Hill",
//        image: "https://images.unsplash.com/photo-1533518509997-eddedc7f704e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9c1bd6b53f7d7995cce0974d8366262&auto=format&fit=crop&w=634&q=80"
//    },
//    {
//        name: "Mountain Goat's Rest",
//        image: "https://images.unsplash.com/photo-1532376059447-80cf8d32eed9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=db1f6d2224dd3c2dc3ed23d2b9d4e6a5&auto=format&fit=crop&w=1350&q=80"
//    },
//    {
//        name: "Acorn Oaks",
//        image: "https://images.unsplash.com/photo-1527707240828-f7ca7d3c46a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a7c6d927c900d0de631511b52ce1687&auto=format&fit=crop&w=1350&q=80"
//    },
//    {
//        name: "Glowing Embers",
//        image: "https://images.unsplash.com/photo-1524856781660-e5c92f4ac62a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=952e5225634b3558eadb9d1395113d12&auto=format&fit=crop&w=1350&q=80"
//    },
//    {
//        name: "Maple Grove",
//        image: "https://images.unsplash.com/photo-1517537353166-1b517b6a8b5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60312daa83e19da2017cb4c6a28b2210&auto=format&fit=crop&w=1350&q=80"
//    },
//    {
//        name: "Sparks Lake",
//        image: "https://images.unsplash.com/photo-1520963959303-a5cc3bdf9260?ixlib=rb-0.3.5&s=fe79334d11dd780c3a81e5d6c52e2e6b&auto=format&fit=crop&w=701&q=80"
//    },
//    {
//        name: "Death Valley",
//        image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44296710cae68fa09464afdbe49e6be8&auto=format&fit=crop&w=634&q=80"
//    },
//    {
//        name: "Timber Creek",
//        image: "https://images.unsplash.com/photo-1508247489384-8a5d237ac250?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e614fa91a779151185dd42899c9639ce&auto=format&fit=crop&w=700&q=80"
//    },
//    {
//        name: "Hidden Cove",
//        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aaf08554d638e2690a4383bf1c632d93&auto=format&fit=crop&w=649&q=80"
//    },
//    {
//        name: "Devil's Tower",
//        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1350&q=80"
//    },
//    {
//        name: "Cedar Pass",
//        image: "https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a13e64c2ca5f8236aebd26c4226acf2&auto=format&fit=crop&w=634&q=80"
//    },
//    {
//        name: "Arbor Hills",
//        image: "https://images.unsplash.com/photo-1491295134315-76602a0b3b75?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b56a3491eda4f91f4b4455d6aa716e5&auto=format&fit=crop&w=634&q=80"
//    }
//);

//routes
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
            res.render('campgrounds', {campgrounds: allCampgrounds });
    });
});
//NEW   -   form page; sends data to app.post campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW/EDIT  -   edit page for each campground site
app.get("/campgrounds/:campID/edit", function(req, res){
    let campID = req.params.campID;
    Campground.findById(campID, function(err, retrievedCampground){
        console.log(retrievedCampground);
        res.render('edit', {campground: retrievedCampground});
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
    res.send("maybe one day");
    
});

//modify campgrounds
//app.put();

//delete campgrounds
app.delete("/campgrounds/:campID", function(req, res){
    let campID = req.params.campID;    

    //delete campground
    Campground.remove({_id: campID}, function(err){
        if(err)
            console.log("problem deleting");
        else
            console.log("campground deleted");
    });

    res.send("got DELETE request");
});

//listen!
app.listen(3000, function () {
  console.log('Yelp Camp is listening!');
});
