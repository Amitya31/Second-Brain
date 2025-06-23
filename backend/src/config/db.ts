import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connectDB = async function(){
   // const uri = process.env.MONGODB_URL as string
   try{
   //  if (!uri) {
   //    throw new Error('MONGODB_URL is not defined in .env');
   //  }
    await mongoose.connect('mongodb+srv://amit31:nIUft4pXBHRJRbU7@cluster0.tee05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ MongoDB connected');
  } catch (e) {
    console.error('❌ MongoDB connection failed:', e);
    process.exit(1);
  }
};


export default connectDB