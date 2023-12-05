import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.info('Connected to MongoDB');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}
