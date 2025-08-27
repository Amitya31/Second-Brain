import { Request, Response } from "express";
import LinkModel from "../models/links.model";
import { random } from "../utils/hash";
import { ContentModel } from "../models/content.model";
import { UserModel } from "../models/user.model";

export const ShareLink = async (req:Request,res:Response)=>{
   try{
    const userdetail = req.userdetail;
    const userId = userdetail._id

    const share:boolean = req.body.share

    const exisitingUser = await LinkModel.findOne({
        UserId:userId
    })

    let Share;
    const hash = random(10)
    if(share){
        if(exisitingUser){
        return res.status(411).json({
            message:"Link already exists"
        })
    }
        Share = await LinkModel.create({
            hash: hash,
            UserId:userId,
        })
        res.status(200).json({
            message:"/share/" + hash,
            success:true,
        })
    } else {
        await LinkModel.deleteOne({
            UserId:userId,
        })
        res.status(200).json({
            message:"Updated Sharable Link",
            success:true
        })
    }


   }catch(e){
    if(e instanceof Error){
        console.log('error occured',e.message)
    }
    return res.status(500).json({
        message:'Internal Server Error',
        success:false
    })
   }
}

export const ShareContent = async (req:Request,res:Response)=>{
    try{
        const {ShareId} = req.params

        const UserContent = await LinkModel.findOne({
            hash:ShareId
        })

        if(!UserContent){
            return res.status(404).json({
                message:"Link is expired",
                success:false
            })
        }

        const Contentdata = await ContentModel.find({
            user:UserContent.UserId
        })

  

        return res.status(200).json({
            content: Contentdata,
            success:true
        })
    }catch(e){
        if(e instanceof Error){
        console.log('error occured',e.message)
        }
        return res.status(500).json({
            message:'Internal Server Error',
            success:false
        })
    }
}