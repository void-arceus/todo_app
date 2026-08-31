import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

/*
if (!mongo_uri) {
    throw new Error("MONGO_URI not provided");
}
*/
async function connectDB() {
    try {
        console.log("Connecting to server...");
        await mongoose.connect(mongo_uri as string);
        console.log("Connected to DataBase successfully");
    } catch (error: any) {
        console.error(`Database connection failed: ${error}`);
        return error;
    }
}

export default connectDB;
