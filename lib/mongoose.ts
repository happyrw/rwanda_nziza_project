import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
    if (isConnected) return console.log("Already connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 20000 // Increase timeout to 20 seconds
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};