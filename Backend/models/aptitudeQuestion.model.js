import mongoose from "mongoose";

const aptitudeQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },

    options: [
      {
        type: String,
        required: true
      }
    ],

    correctAnswer: {
      type: Number, // index of correct option
      required: true
    },

    category: {
      type: String,
      enum: ["quantitative", "logical", "verbal"],
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);