const express = require("express");
const router = express.Router();
const diaryController = require("../../controllers/diary");
const auth = require("../../middlewares/auth");

router.get("/", auth, diaryController.getDayInfo);
router.post("/product", auth, diaryController.addProductToDay);
router.delete("/product/:id", auth, diaryController.deleteProductFromDay);

module.exports = router;
