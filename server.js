
require("dotenv").config()
var PUB_KEY = process.env.PUB_KEY
var SECRET_KEY = process.env.SECRET_KEY
console.log (SECRET_KEY)
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")(SECRET_KEY);

const charge = stripe.charges.create(
    {
        amount: 999,
        currency: 'usd',
        source: 'tok_visa',
        receipt_email: 'jenny.rosen@example.com',
    }
).then(res => {
    console.log (res)
})

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies

var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes

// require("./routes/html-routes.js")(app);
require("./routes/product-api-route.js")(app);
require("./routes/review-api-route.js")(app);


// Syncing our sequelize models and then starting our Express app

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

