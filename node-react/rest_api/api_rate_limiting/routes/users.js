const express = require("express");
const router = express.Router();
const { signUp, login, logout } = require("../controllers/users");

// sign up user
router.post("/users/signup", signUp);

// login user
router.post("/users/login", login);

// logout user
router.post("/users/logout", logout);

router.all(/^\/users\/(login|signup|logout)$/, (req, res) => {
  res.status(405).json({
    error: "Method Not Allowed",
    method: req.method,
    path: req.originalUrl,
  });
});

module.exports = router;
