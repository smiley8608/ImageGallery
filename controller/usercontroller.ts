
import express = require('express')
import Joi = require('joi')
import userModel from '../model/usermodel'
import { UpdatedRequest } from '../types'
import bcrypt from 'bcryptjs'
import  Jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const signInSchema = Joi.object({
    username: Joi.string().max(30).required(),
    firstname: Joi.string().max(30).required(),
    lastname: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required()
}).with('email', 'password')

export const SignIn = (req: UpdatedRequest, res: express.Response) => {

    const { username, firstname, lastname, email, password, conformpassword } = req.body.data

    if (password===conformpassword) {
        
        signInSchema.validateAsync({ username, firstname, lastname, password, email })
        .then(validateResult => {
            userModel.find({email:email})
            .then(emailArr => {
                if (emailArr.length >= 1) {
                    return res.json({ message: 'Email id already exists' })
                } else {
                    console.log('run');
                    bcrypt.hash(password,8)
                            .then(hassedpassword=>{
                                userModel.create({firstname,lastname,username,email,password:hassedpassword})
                                .then(userResult=>{
                                    if(!userResult){
                                        return res.json({message:`can't reach the server please try again later!`})
                                    }else{
                                        let token
                                        if(process.env.Token_Securt){
                                           token= Jwt.sign({_id:userResult.id},process.env.Token_Securt)
                                           return res.json({message:'Account Created successfully !',User:userResult,tkn:token,Auth:true})
                                        }
                                    }
                                }).catch(err=>{
                                    return res.json({message:err})
                                })
                            }).catch(err=>{
                                return res.json({message:err})
                            })
                        }
                    }).catch(err=>{
                        return res.json({message:err})
                    })
            }).catch(err=>{
                return res.json({message:err})
            })
    } else {
        return res.json({ message: 'Please check the PassWord' })
    }
}

  const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required()
})

export const LoginValidation=(req:UpdatedRequest,res:express.Response)=>{
    const {email,password}=req.body.data
    loginSchema.validateAsync({email,password})
    .then(validateLogin=>{
        userModel.findOne({email:email})
        .then(usermail=>{
            if(!usermail){
                return res.json({message:'please enter the valid email Id'})
            }else{
                bcrypt.compare(password,usermail.password as string)
                .then(comparedpass=>{
                    if(comparedpass){
                        if(process.env.Token_Securt){
                            let token=Jwt.sign({_id:usermail._id},process.env.Token_Securt)
                            return res.json({message:'Logined Successfully !',User:usermail,tkn:token ,Auth:true})
                        }
                    }else{
                        return res.json({message:'please check the password !'})
                    }
                }).catch(err=>{
                    return res.json({message:err})
                })
            }
        })
        .catch(err=>{
            return res.json({message:err})
        })
    })
    .catch(err=>{
        return res.json({message:err})
    })
}
export const AuthStatus=(req:UpdatedRequest,res:express.Response)=>{
    return res.json({Auth:true,User:req.User})
}