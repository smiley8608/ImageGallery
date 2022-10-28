import express =require('express')
import ImageModel from '../model/Imagemodel';
import { UpdatedImagetype, UpdatedRequest } from '../types';

export const ImageController=(req:UpdatedRequest,res:express.Response)=>{
console.log(req.files);

    ImageModel.create({email:req.User.email,username:req.User.username,path:(req.files as Express.Multer.File[])[0].path})
    .then(imagecreated=>{
        
            
            return res.json({message:'Image Uploded successfully !'})
        }
    )
    .catch(err=>{
        return res.json({message:err})
    })
}