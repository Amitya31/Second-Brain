import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from "../models/user.model"

dotenv.config()

declare module "express-serve-static-core" {
  interface Request {
    userdetail: any;
  }
}

const VerifyJwt = async (req:Request,res:Response,next:NextFunction)=>{
  const secret = process.env.ACCESS_TOKEN_SECRET;
    
  try{
    let token = req.headers.authorization?.split(' ')[1] 

    if (!token) {
      token = req.cookies?.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        message: "Access token is required",
        success: false,
      });
    }

    if (!secret) {
      console.error('ACCESS_TOKEN_SECRET is not defined');
      return res.status(500).json({
        message: "Server configuration error",
        success: false,
      });
    }

    const decoded = jwt.verify(token as string,secret as string)


    if(!decoded){
      res.status(404).json({
        message:"Unauthorized access",
        success:false,
      })
    }

    const { userId } = decoded as JwtPayload;


    const userdetail = await UserModel.findById(userId);
    if(!userdetail){
      return res.status(401).json({
        message:"User not found",
        success:false,
      })
    }
    req.userdetail = userdetail;
    next()
  }catch(e){
    console.log('JWT Verification Error:', e instanceof Error ? e.message : 'Unknown error');
    
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired",
        success: false,
        code: "TOKEN_EXPIRED"
      });
    }
    
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
        code: "INVALID_TOKEN"
      });
    }
    
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
}  


export default VerifyJwt