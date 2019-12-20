// Backend: require() bc Node only has good support for CommonJS
// Frontend: import bc CRA has Webpack and Babel which provide support for ES6
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
// Our imported file does not return anything so we don't assign it to a var
require("./models/User");
require("./services/passport");

const app = express();

// These 3 middleware will intercept every incoming request
// Middlewares are wired up to Express by app.use()

// Any time a request comes into our applcation, body-parser will pase the body and assign it to req.body
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Requiring authRoutes and bllingRoutes returns a function, to which we pass Express app objects
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect(keys.mongoURI);

// Dynamic port listening
// If there is an environment variable that has been defined by Heroku, use their port, otherwise 5000
const PORT = process.env.PORT || 5000;
// Watches for any traffic coming into port
app.listen(PORT);
