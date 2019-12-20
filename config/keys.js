// determines what environment we are in and what set of keys to return
if (process.env.NODE_ENV === "production") {
  // we are in production - return the prod set of keys
  module.exports = require("./prod");
} else {
  // we are in development - return the dev keys
  module.exports = require("./dev");
}

// cannot use logic like this in our client side
// CommonJS allows logic before import, ES6 does not
