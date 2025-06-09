const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("JWT_SECRET: ", process.env.JWT_SECRET);

const signUp = async (req, res) => {
  const { name, username, email, password, plan } = req.body;

  const passHashed = await bcrypt.hash(password, 10);

  try {
    const results = await User.create({
      name,
      username,
      email,
      password: passHashed,
      plan,
    });
    console.log("result:", results);
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const auth_token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("JWT_SECRET: ", process.env.JWT_SECRET, auth_token);

    res.cookie("auth_token", auth_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "logged in successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out successfully." });
};

module.exports = { signUp, login, logout };
