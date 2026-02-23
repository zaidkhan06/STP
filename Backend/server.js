import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import databaseConnection from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import codingRoutes from "./routes/coding.routes.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import aptitudeRoutes from "./routes/aptitude.routes.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/aptitude", aptitudeRoutes);



databaseConnection();


app.listen(process.env.PORT, () => {
    console.log("Server is Started", process.env.PORT);
})