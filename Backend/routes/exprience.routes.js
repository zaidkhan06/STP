import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createExperience, getFeed, toggleUpvote } from '../controllers/exprience.controller.js';

const router = express.Router();

router.post("/post", protect, createExperience);
router.post("/upvote/:id", protect, toggleUpvote);
router.get("/feed", getFeed);

export default router;

