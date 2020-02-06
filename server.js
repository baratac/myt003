const express = require("express");
const bearerToken = require('express-bearer-token')
const passport = require('passport');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// ----------------------------------------

const citiesRoutes = require('./routes/cities');
const itinerariesRoutes = require('./routes/itineraries');
const activitiesRoutes = require('./routes/activities');
const commentsRoutes = require('./routes/comments');
const usersRoutes = require('./routes/users');
const favoritesRoutes = require('./routes/favorites');

// ----------------------------------------

const passportSetup = require("./passport");
const passportGSetup = require("./passportG");
const keys = require('./keys');

// ----------------------------------------

const app = express();

// ----------------------------------------
app.use(bearerToken());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// ----------------------------------------

app.use(cors());

// ----------------------------------------
/*
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))
*/
app.use(passport.initialize());
//app.use(passport.session());

// ----------------------------------------

app.use('/cities', citiesRoutes);
app.use('/itineraries', itinerariesRoutes)
app.use('/actvts', activitiesRoutes);
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/favorites', favoritesRoutes);

// ----------------------------------------
// console.log("GOING TO CONNECT to MONGOURI:", keys.mongoURI);
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

// ----------------------------------------

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port: [** " + port + " **]");
});

// ----------------------------------------