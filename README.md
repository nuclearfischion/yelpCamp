# web-nodejs-sample

ExpressJS Sample Application

# Developer Workspace
[![Contribute](http://beta.codenvy.com/factory/resources/codenvy-contribute.svg)](http://beta.codenvy.com/f?id=r8et9w6vohmqvro8)

# Stack to use

FROM [codenvy/node](https://hub.docker.com/r/codenvy/node/)

# How to run

| #       | Description           | Command  |
| :------------- |:-------------| :-----|
| 1      | Run | `cd ${current.project.path}/app && node app.js` |

********************************************************************************************************************************************************************************
#YelpCamp

GOAL 1**************************************************************************************************************************************************************************
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

GOAL 2**************************************************************************************************************************************************************************
#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

GOAL 3**************************************************************************************************************************************************************************
#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

GOAL 4**************************************************************************************************************************************************************************
#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

GOAL 5**************************************************************************************************************************************************************************
#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

************************************************************************************************************************************
#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()                 //deletes every document in a collection
* Add a show route/template

RESTFUL ROUTES

name    url             verb    description
=============================================================
index   /dogs           GET     Display a list of all dogs
new     /dogs/new       GET     Displays form to make new dog
create  /dogs           POST    Add new dog to database
show    /dogs/:id       GET     Shows info about one dog
edit    /dogs/:id/edit  


