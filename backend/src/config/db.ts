import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connectDB = async function(){
   const uri = process.env.MONGODB_URL 
   try{
    if (!uri) {
      throw new Error('MONGODB_URL is not defined in .env');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (e) {
    console.error(' MongoDB connection failed:', e);
    process.exit(1);
  }
};


export default connectDB