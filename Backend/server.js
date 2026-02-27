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




// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// CORS 
const allowedOrigins = [
  "http://localhost:5173",  // Local dev
  "http://192.168.1.30:5173",  //Network domain       
  process.env.CLIENT_URL       // Main production domain
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



app.use("/api/auth", authRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/interview", interviewExprience);

app.use("/api/payment", paymentRoutes);


//db
databaseConnection();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(5000, "0.0.0.0", () => {
//   console.log("Server running on port 5000");
// });