const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Take User model and put some indetifying piece of information into the cookie
// user argument references same user pulled out of db in function below
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Take serialized user and turn it back into a user when needed
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      // Avoids Google's redirect_uri_mismatch error in prod
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // Check for duplicates
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // We already had a record with a given profile ID
          done(null, existingUser);
        } else {
          // Creates a new model instance of a user
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
