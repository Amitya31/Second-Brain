import {Request,Response} from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt,{JwtPayload} from 'jsonwebtoken'
dotenv.config()

interface Register{
    username:string,
    password:string,
    email:string,
    accessToken(): string
}

const secret = process.env.ACCESS_TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string

export const registerUser = async (req:Request<{},{},Register>,res:Response)=>{
    
    const {username,password,email} = req.body

    try{
        
      const hashedPassword = await bcrypt.hash(password,10)

      const exisitingUser = await UserModel.findOne({email:email});
      if(exisitingUser){
        return res.status(402).json({
          success:false,
          message:"User Already Exist"
        })
      }
      const newUser = await UserModel.create({
          username,
          password:hashedPassword,
          email,
      })

      const accesstoken = await newUser.accessToken()
      const refreshtoken = await newUser.refreshToken()
      const cookieOptions = {
        httpOnly: true,         // Prevent JS access (secure from XSS)
        secure:process.env.NODE_ENV === 'production',//typescript accepts strict as a literal
        sameSite: process.env.NODE_ENV==='production' ? 'none' as const : 'strict' as const, // Only HTTPS in prod
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path:'/'
      };

      return res.status(200).cookie("token",refreshtoken,cookieOptions ).json({
          message:"Registration Sucessful",
          token:accesstoken,
          success:true,
      })
    }catch(e){
      if(e instanceof Error){
        console.log('Error occured',e.message)
      }
      res.status(500).json({
        message:'Internal Server Error',
        success: false
      })
    }
}


export const loginser = async (req:Request,res:Response):Promise<Response>=>{
  const { email, password } = req.body;
  console.log("Request password:", password);

  try{
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        message: 'User not found',
        success: false,
      });
    }

    const hashedPassword = existingUser.password;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    
    console.log("DB hashed password:", hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false,
      });
    }

    const accesstoken = await existingUser.accessToken()
    const refreshToken = await existingUser.refreshToken()

    const cookieOptions = {
      httpOnly: true,         // Prevent JS access (secure from XSS)
      secure:process.env.NODE_ENV === 'production',//typescript accepts strict as a literal
      sameSite: process.env.NODE_ENV==='production' ? 'none' as const : 'strict' as const, // Only HTTPS in prod
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path:'/'
    };


    return res.status(200).cookie("token",refreshToken,cookieOptions ).json({
      message: 'Login successful',
      success: true,
      token:accesstoken,
    });
  }catch(e){
    if(e instanceof Error){
      console.log('Error occured',e.message)
    }
    return res.status(500).json({
      message:"Internal Server Error",
      success: false
    })
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(token,REFRESH_SECRET)
      const user = await UserModel.findById((decoded as JwtPayload).userId );

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = user.accessToken();

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error("Refresh token error:", (err as Error).message);
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = (_req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,         // Prevent JS access (secure from XSS)
    secure:process.env.NODE_ENV === 'production',//typescript accepts strict as a literal
    sameSite: process.env.NODE_ENV==='production' ? 'none' as const : 'strict' as const, // Only HTTPS in prod
    path:'/'
  };
  res.clearCookie("token",cookieOptions).status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};




