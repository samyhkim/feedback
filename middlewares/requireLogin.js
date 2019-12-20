// middleware to determine whether a user is logged in
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must login!" });
  }

  next();
};
