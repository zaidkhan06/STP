import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import databaseConnection from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import interviewExprience from "./routes/exprience.routes.js";
import codingRoutes from "./routes/coding.routes.js";
import aptitudeRoutes from "./routes/aptitude.routes.js";

const app = express();

/* =========================
   Middleware Order Matters
========================= */

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// CORS Configuration (Production Safe)
const allowedOrigins = [
  "http://localhost:5173",          // Local dev
  process.env.CLIENT_URL            // Main production domain
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||                             // Allow non-browser tools
        allowedOrigins.includes(origin) ||     // Exact matches
        origin.includes("vercel.app")          // Allow Vercel preview URLs
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Important: Handle preflight requests
app.options("*", cors());

/* =========================
   Routes
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/interview", interviewExprience);

/* =========================
   Database
========================= */

databaseConnection();

/* =========================
   Server
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});