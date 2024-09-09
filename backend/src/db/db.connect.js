import mongoose from "mongoose";
export async function connectDB(next) {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        next;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
