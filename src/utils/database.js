import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config({quiet:true})
const mongo_url = process.env.MONGO_URI;

if (!mongo_url) {
  throw new Error('❌ MONGODB_URI environment variable is required');
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log('✅ MongoDB connected successfully 🚀');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message, '💥');
        process.exit(1)
    }
}

export const isDBConnected = () => mongoose.connection.readyState === 1;

export default connectDB;
