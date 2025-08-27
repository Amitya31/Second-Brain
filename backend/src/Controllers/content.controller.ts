import { Request, Response, Router } from "express";
import { ContentModel } from "../models/content.model";
import { TagModel } from "../models/tags.model";
import { random } from "../utils/hash";


export const CreateContent = async (req:Request,res:Response)=> {
    try{
        const { url, contentType, tags, title  } = req.body;
        const userdetail= req.userdetail;

        const userId = userdetail._id

        let processedTags:any = [];
        if(tags){
            if(typeof tags==="string"){
                processedTags = tags.split(',').map(tag=>tag.trim().toLowerCase)
            } else if(Array.isArray(tags)){
                processedTags = tags.map(tag=>tag.trim().toLowerCase())
            }
        }

        processedTags = [...new Set(processedTags.filter(Boolean))]

        const existingTags = await TagModel.find({title: {$in: processedTags}})
        const existingTagNames = existingTags.map(t=>t.title);
        const existingTagIds = existingTags.map(t=>t._id.toString())

        
        const missingTags = processedTags.filter((tagName: string)=>!existingTagNames.includes(tagName))

        let newTagIds: string[] = [];

        if (missingTags.length > 0) {
            const createdTags = await TagModel.insertMany(
            missingTags.map((tag:string) => ({ title: tag }))
        );
            newTagIds = createdTags.map(t => t._id.toString());
        }

        const tagIds = [...existingTagIds, ...newTagIds]

        const Contentdata = await ContentModel.create({
            url,
            user: userId,
            type:contentType,
            title,
            tags: tagIds
        })

        return res.status(200).json({
            message: "Content added successfully",
            success: true,
        })

    }catch(e){
        if(e instanceof Error){
            console.log("error message: ",e.message)
        }
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }    
}

export const EditContent = async (req:Request,res:Response)=>{
    try{
        const { url, contentType, tags, title  } = req.body;
        const {id} = req.params;
        const userdetail = req.userdetail

        const userId = userdetail._id

        let processedTags:any = [];

        if(typeof tags==="string" ){
            processedTags = tags.split(',').map((tag=>tag.trim().toLowerCase()))
        } else if(Array.isArray(tags)){
           processedTags = tags.map((tag=>tag.trim().toLowerCase()))
        }

        processedTags = [...new Set(processedTags.filter(Boolean))]

        const existingTags = await TagModel.find({title: {$in: processedTags}})
        const existingTagNames = existingTags.map(t=>t.title)
        const existingTagIds = existingTags.map(t=>t._id)

        const missingTags = processedTags.filter((tagName: string)=>!existingTagNames.includes(tagName))

        let newTagIds:string[] = [];

        if(missingTags.length>0){
            const createdTags = await TagModel.insertMany(
                missingTags.map((tag: string)=>{{tag: title}})
            )

            newTagIds=createdTags.map(t=>t._id.toString());
        }

        const updatedContent = await ContentModel.findByIdAndUpdate(id,{
            url,
            type:contentType,
            user:userId,
            title,
            tags: newTagIds,
        })

        res.status(200).json({
            message:"updated successfully",
            success:true
        })

    }catch(e){ 
        if(e instanceof Error){
            console.log("error occured",e.message)
        }
        return res.status(500).json({
            message:"Internet server error"
        })
    }
}

export const deleteContent = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const userdetail = req.userdetail

        const userId = userdetail._id

        if(!userId){
            return res.status(404).json({
                message:"Unauthorized Access",
                success:false
            })
        }

        const existingContent = await ContentModel.findById(id)
        if(!existingContent){
            return res.status(400).json({
                message:"Content doesn't exist",
                success:false
            })
        }

        const deleteContent = await ContentModel.findOneAndDelete({
            _id: id,
            user:userId
        })

        return res.status(200).json({
            message: "Content deleted successfully",
            success:true
        })

    }catch(e){
        if(e instanceof Error){
            console.log("Error occured",e.message)
        }
    }
}

export const getContent = async(req:Request,res:Response)=>{
    try{
    const userdetail = req.userdetail;
    const userId = userdetail._id

    if(!userId){
        return res.status(400).json({
            message:"Unauthorized Access",
            success:false
        })
    }

    
    const Contentdata = await ContentModel.find({
        user:userId
    }).populate("user","username").populate("tags",'title')
    
    return res.status(200).json({
        message:"Retrived Successfully",
        data:Contentdata,
        success:true
        
    })
    }catch(e){
        if(e instanceof Error){
            console.log("error occured", e.message)
        }
        return res.status(500).json({
            message:"Internal server Error",
            success:false
        })
    }
}