const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // 1. User makes a request to /auth/google/callback
  // 2. passport middleware takes over and authenticates
  // 3. Middleware passes the reequest to next handler in the chain, the arrow function
  // 4. We take the request and tell the response to inform the browser to go to /surveys
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // Passport automatically attaches user property to req object
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // Passport automatically attaches some functions to req object, including logout()
  app.get("/api/logout", (req, res) => {
    // Takes cookie contains user ID and kills the ID
    req.logout();
    res.redirect("/");
    // Display confirmation to user, should show empty screen
    // res.send(req.user);
  });
};
