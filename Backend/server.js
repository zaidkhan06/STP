import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import databaseConnection from './config/db.js'

const app = express();

app.use(express.json());

databaseConnection();

app.use("/",(req, res)=>{
    res.send("Server is running")
})
app.listen(process.env.PORT, ()=>{
    console.log("Server is Started", process.env.PORT);
})