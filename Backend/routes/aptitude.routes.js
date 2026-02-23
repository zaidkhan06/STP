import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { checkAnswer, getQuestionsByCategory, submitPractice } from "../controllers/aptitude.controller.js";

const router = express.Router();

router.post("/practice/submit", protect, submitPractice);
router.get("/category/:category", protect, getQuestionsByCategory);
router.post("/check", protect, checkAnswer);


export default router;