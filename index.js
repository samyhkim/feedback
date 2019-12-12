// We use require() rather than import bc Node doesn't have easy compatibiliy with ES6
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// Our imported file does not return anything so we don't assign it to a var
require("./models/User");
require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Requiring authRoutes returns a function, to which we pass app
require("./routes/authRoutes")(app);

mongoose.connect(keys.mongoURI);

// Dynamic port listening
// If there is an environment variable that has been defined by Heroku, use their port, otherwise 5000
const PORT = process.env.PORT || 5000;
// Watches for any traffic coming into port
app.listen(PORT);
