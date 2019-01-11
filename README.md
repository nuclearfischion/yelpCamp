# YelpCamp
## How to run

1. Install MongoDB for your OS
2. Run command 'mongod' to start Mongo background process
3. Run command 'node app.js'
4. Go to 'localhost:3000' in your browser to view app

---
## GOAL 1
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image
---

## GOAL 2
### Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap
---

## GOAL 3
### Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form
---

## GOAL 4
### Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid
---

## GOAL 5
### Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form
---

### Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside our routes

### Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()                 //deletes every document in a collection
* Add a show route/template

### RESTFUL ROUTES

| Name    | URL            |  Verb   |  Description                                      |
| ---     | ---            | ---     | ---                                               |
| index   | /dogs          |  GET    |  Display a list of all dogs                       |
| new     | /dogs/new      |  GET    |  Displays form to make new dog                    |
| create  | /dogs          |  POST   |  Add new dog to database                          |
| show    | /dogs/:id      |  GET    |  Shows info about one dog                         |
| edit    | /dogs/:id/edit |  GET    |  Show edit form for one dog                       |
| update  | /dogs/:id      |  PUT    |  Update a particular dog, then redirect somewhere |
| destroy | /dogs/:id      |  DELETE |  Delete a particular dog, then redirect somewhere |

---
## RESTful Routing
### Introduction
* REST - a mapping between HTTP routes and CRUD

### Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

### Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

### Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

### Comment New/Create
* Discuss nested routes
    - comments need to be nested in campground routes
    
    ## Campground Routes
    
    | Name    | URL              | HTTP Verb             |
    | ---     | ---              | ---                   |
    | INDEX   | /campgrounds     | GET                   |
    | NEW     | /campgrounds/new | GET                   |
    | CREATE  | /campgrounds     | POST                  |
    | SHOW    | /campgrounds/:id | GET                   |
    | EDIT    | same as SHOW     |                       |
    | UPDATE  | /campgrounds/:id | PUT (ajax request)    |
    | DESTROY | /campgrounds/:id | DELETE (ajax request) |
    
    Comment Routes
    
    | Name   | URL                           | HTTP Verb                                      |
    | ---    | ---                           | ---                                            |
    | INDEX  | /campgrounds/:id              | GET (displayed on each campground's SHOW page) |
    | NEW    | /campgrounds/:id/comments/new | GET                                            |
    | CREATE | /campgrounds/:id/comments     | POST                                           |
    
* Add the comment new and create routes
* Add the new comment form

### Style Show Page
* Add sidebar to show page
* Display comments nicely

### Finish Styling Show Page
* Add public directory
* Add custome stylesheet

### Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

### Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

### Auth Pt. 3 - Login
* Add login routes
* Add login template

### Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

### Auth Pt. 5 - Show/Hide Links
* Show/hide auth links correctly

### Refactor Routes
* Use Express router to reorganize all routes

### Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

### Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

### Editing Campgrounds
* Add Method-Override (currently using ajax requests)
* Add Edit Route for Campgrounds (currently on same page as show page)
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

### Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

### Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

### Editing Comments
* Add Edit route for comments           [x]
* Add Edit button                       [x]
    * added bootstrap dropdown menu to each comment. this needs to be styled.
* Add Update route                      [x]

### Deleting Comments                   [ ]
* Add Destroy route                     [x]
* Add Delete button                     [x]

### Authorization Part 2: Comments          [x]
* User can only edit his/her comments       [x]
* User can only delete his/her comments     [x]
* Hide/show edit and delete buttons         [x]
* Refactor Middleware                       [x]

### Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

### Update landing UI

### Dynamic Prices

