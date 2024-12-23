import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const connectDB = async () => {
    const dbURI = process.env.MONGO_URI;  // Access the MONGO_URI from the .env file
    if (!dbURI) {
        console.error("MongoDB URI is not defined in environment variables!");
        return;
    }
    await mongoose.connect(dbURI).then(() => console.log("Db Connected"));
};