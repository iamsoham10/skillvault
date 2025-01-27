const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/userController");
const inputValidator = require("../middlewares/inputValidator");

router.get("/user/:user_id", inputValidator.checkParam, authControllers.getUserController);
router.post("/register", inputValidator.checkInput, authControllers.createUserController);
router.post("/login", inputValidator.checkLoginInput, authControllers.loginUserController);
router.post("/refresh-token", authControllers.refreshTokenController);
router.post('/verify-otp', authControllers.otpVerificationController);
router.put("/user/:id");
router.delete("/user/:id");

module.exports = router;
