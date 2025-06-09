const { RateLimiterRedis } = require("rate-limiter-flexible");
const Redis = require("ioredis");
const redisClient = new Redis();
const freeUserLimit = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5,
  duration: 60,
});
const rateLimiter = async (req, res, next) => {
  if (req.user.plan === "free") {
    try {
      await freeUserLimit.consume(req.ip);
      next();
    } catch {
      res.status(429).send("Too Many Requests");
    }
  } else {
    next();
  }
};

module.exports = rateLimiter;
