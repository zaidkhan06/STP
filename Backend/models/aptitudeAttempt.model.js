import mongoose from "mongoose";

const aptitudeAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    mode: {
      type: String,
      enum: ["practice", "mock"],
      required: true
    },

    category: {
      type: String // only for practice
    },

    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AptitudeQuestion"
        },
        selectedAnswer: Number,
        correct: Boolean
      }
    ],

    score: Number,
    totalQuestions: Number,
    percentage: Number,

    duration: Number // time taken in seconds
  },
  { timestamps: true }
);

export default mongoose.model("AptitudeAttempt", aptitudeAttemptSchema);