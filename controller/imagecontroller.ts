import express = require('express')
import ImageModel from '../model/Imagemodel';
import userModel from '../model/usermodel';
import { UpdatedImagetype, UpdatedRequest } from '../types';

export const ImageController = (req: UpdatedRequest, res: express.Response) => {
    console.log(req.files);
    console.log(req.User);

    ImageModel.create({ email: req.User.email, username: req.User.username, path: (req.files as Express.Multer.File[])[0].path })
        .then(imagecreated => {


            return res.json({ message: 'Image Uploded successfully !' })
        }
        )
        .catch(err => {
            return res.json({ message: err })
        })
}

export const AllImageController = (req: UpdatedRequest, res: express.Response) => {
    ImageModel.find({})
        .then((responce) => {
            if (responce.length >= 1) {
                return res.json({ allimages: responce })
            } else {
                return res.json({ message: 'database has no image' })
            }
        })
        .catch((err) => {
            return res.json({ message: err })
        })
}
export const MyImageCOntroller = (req: UpdatedRequest, res: express.Response) => {
    ImageModel.find({ email: req.User.email })
        .then(responce => {
            if (responce.length >= 1) {
                return res.json({ myimage: responce })
            }
            else {
                return res.json({ message: 'user has no gallery' })
            }
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

export const ImageViewer = (req: UpdatedRequest, res: express.Response) => {

    const id = req.params['id']
    console.log(id);

    ImageModel.findOne({ _id: id })
        .then(respon => {
            console.log(respon);

            if (!respon) {
                return res.json({ message: 'this image does not exists' })
            } else {
                return res.json({ viewer: respon })
            }
        }).catch(err => {
            return res.json({ message: err })
        })
}

export const AddImage = (req: UpdatedRequest, res: express.Response) => {
    const  _id  = req.body._id
    console.log(_id);
    

    ImageModel.findById({_id:_id})
        .then(imageobject => {
            console.log(imageobject);
            
            if (!imageobject) {
                return res.json({ message: 'This image does not exists' })
            } else {
                userModel.findOne({ email: req.User.email })
                    .then(userobject => {
                        if (!userobject) {
                            return res.json({ message: 'user does not exists' })
                        }
                        ImageModel.create({ email: userobject.email, path: imageobject.path, username: userobject.username })
                            .then(result=>{
                                return res.json({message:'Added to your gallery successfully !'})
                            })
                            .catch(err=>{
                                return res.json({message:err})
                            })
                    }).catch(err=>{
                        return res.json({message:err})
                    })
            }
        })
        .catch(err=>{
            return res.json({message:err})
        })
}

export const RemoveImage=(req:UpdatedRequest,res:express.Response)=>{
    const _id=req.body._id
    ImageModel.findById({_id:_id})
    .then(imageobject=>{
        console.log('ttytf'+imageobject);
        
        if(!imageobject){
            return res.json({message:'This image does not exists'})
        }else{
            userModel.findOne({email:req.User.email})
            .then(userObject=>{
                if(!userObject){
                    return res.json({message:'user does not exists'})
                }else if(imageobject.email===userObject.email){

                    ImageModel.deleteOne({path:imageobject.path})
                    .then(result=>{
                        return res.json({message:'Image deleted successfully'})
                    }).catch(err=>{
                        return res.json({message:err})
                    })
                }else {
                    return res.json({message :'this image can not be deleted !'})
                }
            })
            .catch(err=>{
                return res.json({message:err})
            })
        }
    }).catch(err=>{
        return res.json({message:err})
    })
}
