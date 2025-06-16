const express = require("express");
const ctrl = require("../../controllers/users");
const {
  validateSignup,
  validateLogin,
} = require("../../validation/userValidation");
const auth = require("../../middlewares/auth");
const { updateUserProfile } = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validateSignup, ctrl.signup);
router.post("/login", validateLogin, ctrl.login);
router.get("/logout", auth, ctrl.logout);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.resendVerificationEmail);
router.patch("/profile", auth, updateUserProfile);
router.get("/profile", auth, ctrl.getUserProfile);

module.exports = router;
