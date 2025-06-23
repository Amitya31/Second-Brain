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
    
    try{
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token

        const decoded = jwt.verify(token as string,"S3CR3TK3Y")


        if(!decoded){
            res.status(404).json({
                message:"Unauthorized access",
                success:false,
            })
        }

        const { userId } = decoded as JwtPayload;


        const userdetail = await UserModel.findById(userId);
        req.userdetail = userdetail;
        next()
    }catch(e){
        if(e instanceof Error){
      console.log('Error occured',e.message)
    }
        return res.status(500).json({
        message: "Invalid or expired token",
        success: false,
        });
    }
}  

export default VerifyJwt