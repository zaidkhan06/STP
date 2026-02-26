import express from "express";
import {
  createCodingQuestion,
  getCodingQuestions,
  getSolvedQuestions,
  toggleSolved
} from "../controllers/coding.controller.js";
import {protect} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createCodingQuestion);
router.get("/", protect, getCodingQuestions);
router.post("/:id/toggle", protect, toggleSolved);
router.get("/solve-question", protect, getSolvedQuestions);

export default router;