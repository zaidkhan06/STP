import mongoose from "mongoose";
import dotenv from "dotenv";
import AptitudeQuestion from "../models/aptitudeQuestion.model.js";

dotenv.config();

await mongoose.connect(process.env.DB_URL);

const questions = [
  {
    question: "If 2x + 3 = 7, find x.",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "quantitative",
    difficulty: "easy"
  },
  {
    question: "Find next number: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "64"],
    correctAnswer: 2,
    category: "logical",
    difficulty: "easy"
  },
  {
    question: "Choose correct synonym of 'Rapid'.",
    options: ["Slow", "Fast", "Weak", "Soft"],
    correctAnswer: 1,
    category: "verbal",
    difficulty: "easy"
  }
];

const seedData = async () => {
  try {
    await AptitudeQuestion.deleteMany();
    await AptitudeQuestion.insertMany(questions);
    console.log("Aptitude data seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();