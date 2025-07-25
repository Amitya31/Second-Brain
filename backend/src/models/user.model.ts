import mongoose from "mongoose";
import {Schema} from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path:'../'
})

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  accessToken(): string;
  refreshToken(): string;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required:[true,'Please provide a username'],
        trim:true,
        lowercase: true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6
    },
    email:{
        type:String,
        required:[true,'please provide an email'],
        unique:[true,'Email already exists'],
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
})

UserSchema.methods.accessToken = function():string{
    const accessToken = jwt.sign({userId:this._id},"S3CR3TK3Y")
    return accessToken;
}

UserSchema.methods.refreshToken =  function(){
    const refreshToken = jwt.sign({userId:this._id},process.env.JWTSECRET as string ,{expiresIn:'7d'})
    return refreshToken;
}

export const UserModel = mongoose.model<IUser>('User',UserSchema)