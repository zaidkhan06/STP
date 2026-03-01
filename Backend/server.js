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
import paymentRoutes from "./routes/payment.routes.js";


const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/interview", interviewExprience);
app.use("/api/payment", paymentRoutes);

databaseConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
