const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // logic to handle token
  // doesn't matter how many functions or middlewares we pass through route handler as long as one of them processes the request
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 email credits",
      source: req.body.id
    });

    // console.log(charge)
    // access User model
    req.user.credits += 5;
    // create another copy of user returned from await, so we get the absolute most updated user model
    const user = await req.user.save();
    // send back the user just created to the browser
    res.send(user);
  });
};
