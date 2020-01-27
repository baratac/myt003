const passport = require('passport')
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/userModel");
const key = require("./keys");

const opts = {
    secretOrKey: key.secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('JWT PAYLOAD:', jwt_payload)
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false, {message: 'User not found'});
        })
        .catch(err => {
          console.log("User database error:", err);
          return done(err);
        });
    })
  );