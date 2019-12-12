const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  // Passport automatically attaches user property to req object
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    console.log(req.user);
  });

  // Passport automatically attaches some functions to req object, including logout()
  app.get("/api/logout", (req, res) => {
    // Takes cookie contains user ID and kills the ID
    req.logout();
    // Display confirmation to user, should show empty screen
    res.send(req.user);
  });
};
