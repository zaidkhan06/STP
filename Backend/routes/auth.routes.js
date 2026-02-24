import express from "express";
import {
  registerUser,
  verifyEmail,
  resendVerification,
  loginUser,
  checkAuth,
  logout
} from "../controllers/auth.controller.js";
import verificationLimiter from "../middlewares/rateLimit.middleware.js";
import {protect} from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post(
  "/resend-verification",
  verificationLimiter,
  resendVerification
);
router.get("/check", protect, checkAuth);
router.post("/logout", logout);


export default router;