const express = require("express");
const router = express.Router();
const { getNotRecommendedFoods } = require("../../controllers/products");
const { searchProducts } = require("../../controllers/products");


router.get("/not-recommended/:bloodGroup", getNotRecommendedFoods);
router.get("/search", searchProducts);

module.exports = router;
