const express = require("express");
const router = express.Router();
const {
  getByName,
  getByDescription,
  getByCategory,
  getByPriceRange,
  getByQuantityRange,
  getLowStock,
} = require("../controllers/products");
const userAuthentication = require("../middlewares/auth");
const rateLimiter = require("../middlewares/rate_limiter");

// search by name
router.get("/products/name", userAuthentication, rateLimiter, getByName);

// search by description
router.get(
  "/products/description",
  userAuthentication,
  rateLimiter,
  getByDescription
);

// search by category
router.get(
  "/products/category",
  userAuthentication,
  rateLimiter,
  getByCategory
);

// search by price range
router.get(
  "/products/price-range",
  userAuthentication,
  rateLimiter,
  getByPriceRange
);

// search by quantity range
router.get(
  "/products/quantity-range",
  userAuthentication,
  rateLimiter,
  getByQuantityRange
);

// search by stock quantity < 20
router.get("/products/low-stock", userAuthentication, rateLimiter, getLowStock);

router.all(
  /^\/products\/(name|description|category|price-range|quantity-range|low-stock)$/,
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
