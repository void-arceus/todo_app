import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri: string = process.env.MONGO_URI || "";

console.log(`Mongo URI: ${mongo_uri}`);

if (!mongo_uri) {
    throw new Error("MONGO_URI not provided");
}

async function connectDB() {
    try {
        console.log("Connecting to server...");
        await mongoose.connect(mongo_uri);
        console.log("Connected to DataBase successfully");
    } catch (error: any) {
        console.error(`Database connection failed: ${error}`);
        return error;
    }
}

export default connectDB;
