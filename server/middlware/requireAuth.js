const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Read token off cookies
    const token = req.cookies.Authorization;

    // decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Check Authorization
    if (Date.now() > decoded.Authorization) return res.sendStatus(401);

    // find user using decoding sub
    const user = await User.findById(decoded.sub);
    if (!user) return res.sendStatus(401);

    // attach user to req
    req.user = user;

    // continue on
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}
module.exports = requireAuth;
