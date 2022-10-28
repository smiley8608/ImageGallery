
import { string } from "joi";
import mongoose from "mongoose";

const imageSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },username:{
        type:String,
        require:true
    },path:{
        type:String,
        require:true
    }
})

const ImageModel=mongoose.model('image',imageSchema)

export default ImageModel