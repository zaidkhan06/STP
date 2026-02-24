import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { checkAnswer, getProfile, getProfileAnalytics, getQuestionsByCategory, startMockTest, submitMockTest, submitPractice } from "../controllers/aptitude.controller.js";

const router = express.Router();

router.post("/practice/submit", protect, submitPractice);
router.get("/category/:category", protect, getQuestionsByCategory);
router.post("/check", protect, checkAnswer);
router.get("/mock/start", protect, startMockTest);
router.post("/mock/submit", protect, submitMockTest);
router.get("/profile-analytics", protect, getProfileAnalytics);
router.get("/profile", protect, getProfile)

export default router;