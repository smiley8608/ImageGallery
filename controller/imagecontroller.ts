import express =require('express')
import ImageModel from '../model/Imagemodel';
import { UpdatedImagetype, UpdatedRequest } from '../types';

export const ImageController=(req:UpdatedRequest,res:express.Response)=>{
console.log(req.files);
console.log(req.User);

    ImageModel.create({email:req.User.email,username:req.User.username,path:(req.files as Express.Multer.File[])[0].path})
    .then(imagecreated=>{
        
            
            return res.json({message:'Image Uploded successfully !'})
        }
    )
    .catch(err=>{
        return res.json({message:err})
    })
}

export const AllImageController=(req:UpdatedRequest,res:express.Response)=>{
    ImageModel.find({})
    .then((responce)=>{
        if(responce.length>=1){
            return res.json({allimages:responce})
        }else{
            return res.json({message:'database has no image'})
        }
    })
    .catch((err)=>{
        return res.json({message:err})
    })
}
export const MyImageCOntroller=(req:UpdatedRequest,res:express.Response)=>{
    ImageModel.find({email:req.User.email})
    .then(responce=>{
        if(responce.length>=1){
            return res.json({myimage:responce})
        }
        else{
            return res.json({message:'user has no gallery'})
        }
    })
    .catch(err=>{
        return res.json({message:err})
    })
}

export const ImageViewer=(req:UpdatedRequest,res:express.Response)=>{

    const id=req.params['id']
    console.log(id);

    ImageModel.findOne({_id:id})
    .then(respon=>{
        console.log(respon);
        
        if(!respon){
            return res.json({message:'this image does not exists'})
        }else{
            return res.json({viewer:respon})
        }
    }).catch(err=>{
        return res.json({message:err})
    })
    

    
}