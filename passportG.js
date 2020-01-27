const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/userModel");
const key = require("./keys");

const opts = {
    clientID: key.googleAuth.id,
    clientSecret: key.googleAuth.key,
    callbackURL: "/users/authGoogle/redirect"
};
/*
passport.serializeUser((user, done) =>  {
  console.log("Serialize User", user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
})
*/
passport.use(
    new GoogleStrategy(opts,
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id })
          .then( user => {
            if (user) {
              console.log('The User still is:', user);
              try {
                return done(null, user);
              }
              catch(err) {
                console.log('Done failed', err);
                done(err, false);
              }
            } else {
              new User({name: profile.displayName, googleId: profile.id})
                .save().then((newUser) => {
                  console.log('New User:', new user)
                  return done(null, newUser);
                });
            }
          })
          .catch( err => {
            console.log('User database error', err);
            return done(err);
          }
        ); 
      }
    )
  ); 