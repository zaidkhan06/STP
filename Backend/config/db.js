import mongoose from "mongoose";

async function db() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected");
    } catch (error) {
    console.log("Connection Failed"); 
    process.exit(1);  
    }    
}

export default db;