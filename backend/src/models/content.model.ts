import mongoose, { mongo } from 'mongoose'
import {Schema} from 'mongoose'

const contentTypes = ['image','audio','video','document','tweet']

const ContentSchema = new Schema({
    url:{
        type:String,
        required:[true,"Please provide a url"]
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

    type:{
        type:String,
        enum:contentTypes,
        required:true
    },
    
    title:{
        type:String,
        required:true
    },

    tags:[{
        type:mongoose.Types.ObjectId,
        ref:'Tags'
    }]
})

export const ContentModel = mongoose.model('Content',ContentSchema)
