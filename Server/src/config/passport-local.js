var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

passport.use(
  // defining passport Local Strategy
  new LocalStrategy(
    {
      usernameField: "adhaar",
      passwordField: "password",
    },
    (adhaar, password, done) => {
      // User Authentication OR Login
      User.findOne({ adhaar: adhaar }).then((currUser) => {
        if (currUser == null) {
          // done(error, user, info) - callback function
          return done(null, false, {
            message: "User isn't registered!",
            success: false,
          });
        }

        if (!currUser.authenticate(password)) {
          return done(null, false, {
            message: "Email & password don't match!",
            success: false,
          });
        }
        return done(null, currUser);
      });
    }
  )
);
