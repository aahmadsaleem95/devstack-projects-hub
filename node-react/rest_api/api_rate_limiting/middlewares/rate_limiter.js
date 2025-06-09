const rateLimit = require("express-rate-limit");

const freeUserLimit = rateLimit({
  windowMs: 1 * 50 * 1000,
  max: 5,
  message: "Free plan: Too many requests. Try again Later.",
});

const rateLimiter = (req, res, next) => {
  if (req.user.plan === "free") {
    return freeUserLimit(req, res, next);
  } else {
    next();
  }
};

module.exports = rateLimiter;
