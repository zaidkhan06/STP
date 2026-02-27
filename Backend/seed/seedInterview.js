import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

// 🔹 Replace with your model path
import InterviewExperience from "../models/interviewExprience.model.js";

const companies = [
  "TCS", "Infosys", "Wipro", "Accenture", "Capgemini",
  "HCL", "Cognizant", "Tech Mahindra", "LTIMindtree", "IBM"
];

const roles = [
  "ASE",
  "System Engineer",
  "Software Developer",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer"
];

const difficulties = ["Easy", "Medium", "Hard"];

const experienceTexts = [
  "Asked about OOPS and DBMS basics.",
  "DSA round included arrays and linked list problems.",
  "Focused on React hooks and lifecycle methods.",
  "SQL queries and normalization were discussed.",
  "Node.js and REST API implementation questions.",
  "Behavioral and HR round was smooth.",
  "One coding question on string manipulation.",
  "Project discussion was very detailed."
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinLast60Days() {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - 60);

  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  );
}

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const records = [];

    for (let i = 0; i < 50; i++) {
      const created = randomDateWithinLast60Days();
      const updated = new Date(created.getTime() + 1000 * 60 * 60 * 24);

      const upvotes = Math.floor(Math.random() * 50);

      records.push({
        user: new mongoose.Types.ObjectId(),
        company: randomItem(companies),
        role: randomItem(roles),
        experience: randomItem(experienceTexts),
        difficulty: randomItem(difficulties),
        upvotes: upvotes,
        voters: Array.from({ length: Math.floor(upvotes / 5) }, () =>
          new mongoose.Types.ObjectId()
        ),
        createdAt: created,
        updatedAt: updated
      });
    }

    await InterviewExperience.insertMany(records);

    console.log("50 Interview Experiences Inserted Successfully ✅");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
}

seedData();