const jwt = require("jsonwebtoken");
const { User } = require("../models");

const userAuthentication = async (req, res, next) => {
  console.log("cookies: ", req.cookies);
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({
      message: "No auth_token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = userAuthentication;
