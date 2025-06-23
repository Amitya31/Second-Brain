import {Request,Response} from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt'

interface Register{
    username:string,
    password:string,
    email:string,
    accessToken(): string
}

export const registerUser = async (req:Request<{},{},Register>,res:Response):Promise<void>=>{
    
    const {username,password,email} = req.body

    try{
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await UserModel.create({
            username,
            password:hashedPassword,
            email,
        })

        const token = await newUser.accessToken()
        const cookieOptions = {
          httpOnly: true,          // Prevent JS access (secure from XSS)
          secure: true, // Only HTTPS in prod
          sameSite:"strict" as const, //typescript accepts strict as a literal
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        res.status(200).cookie("token",token,cookieOptions ).json({
            message:"Registration Sucessful",
            token:token,
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

    const token = await existingUser.accessToken()

    const cookieOptions = {
      httpOnly: true,          // Prevent JS access (secure from XSS)
      secure: true, // Only HTTPS in prod
      sameSite:"strict" as const, //typescript accepts strict as a literal
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res.status(200).cookie("token",token,cookieOptions ).json({
      message: 'Login successful',
      success: true,
      token,
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




