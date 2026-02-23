import mongoose from "mongoose";

const codingQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    },

    tags: [
      {
        type: String
      }
    ],

    platform: {
      type: String,
      enum: ["leetcode", "gfg", "codeforces", "other"],
      required: true
    },

    link: {
      type: String,
      required: true
    },

    companyTags: [
      {
        type: String
      }
    ],

    isPremium: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("CodingQuestion", codingQuestionSchema);