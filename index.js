// We use require() rather than import bc Node doesn't have easy compatibiliy with ES6
const express = require("express");
const app = express();

// Route handler
app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// Dynamic port listening
// If there is an environment variable that has been defined by Heroku, use their port, otherwise 5000
const PORT = process.env.PORT || 5000;
// Watches for any traffic coming into port
app.listen(PORT);
