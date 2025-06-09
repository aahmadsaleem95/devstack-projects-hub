const express = require("express");
const router = express.Router();
const { getByName, getByDescription } = require("../controllers/todos");
const userAuthentication = require("../middlewares/auth");
const rateLimiter = require("../middlewares/rate_limiter");

// search by name
router.get("/todos/name", userAuthentication, rateLimiter, getByName);

// search by description
router.get(
  "/todos/description",
  userAuthentication,
  rateLimiter,
  getByDescription
);

router.all(
  /^\/todos\/(name|description)$/,
  userAuthentication,
  rateLimiter,
  (req, res) => {
    res.status(405).json({
      error: "Method Not Allowed",
      method: req.method,
      path: req.originalUrl,
    });
  }
);

module.exports = router;
