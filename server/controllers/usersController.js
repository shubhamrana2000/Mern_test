const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function signup(req, res) {
  try {
    // Get the enail and password of request body
    const { email, password } = req.body;
    // Hash Password
    const hashedPassword = bcrypt.hashSync(password, 8);
    // Create a user with the data
    await User.create({ email, password: hashedPassword });
    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    // Get the email and password of req body
    const { email, password } = req.body;
    // Find the user with requested body
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    // compare sent in password with user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    // create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      // secure: process.env.process.env.NODE_ENV === "production",
    });

    // send it
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return req.sendStatus(401);
  }
}
function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return req.sendStatus(401);
  }
}

function checkAuth(req, res) {
  try {
    // console.log(req.user);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return req.sendStatus(401);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
