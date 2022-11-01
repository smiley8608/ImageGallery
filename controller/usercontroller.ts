
import express = require('express')
import Joi = require('joi')
import userModel from '../model/usermodel'
import { MailerProps, UpdatedRequest } from '../types'
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TokenModel from '../model/tokenmodel'
import crypto from 'crypto'
import nodemailer = require('nodemailer')
import e = require('express')
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

    if (password === conformpassword) {

        signInSchema.validateAsync({ username, firstname, lastname, password, email })
            .then(validateResult => {
                userModel.find({ email: email })
                    .then(emailArr => {
                        if (emailArr.length >= 1) {
                            return res.json({ message: 'Email id already exists' })
                        } else {
                            console.log('run');
                            bcrypt.hash(password, 8)
                                .then(hassedpassword => {
                                    userModel.create({ firstname, lastname, username, email, password: hassedpassword })
                                        .then(userResult => {
                                            if (!userResult) {
                                                return res.json({ message: `can't reach the server please try again later!` })
                                            } else {
                                                let token
                                                if (process.env.Token_Securt) {
                                                    token = Jwt.sign({ _id: userResult.id }, process.env.Token_Securt)
                                                    return res.json({ message: 'Account Created successfully !', User: userResult, tkn: token, Auth: true })
                                                }
                                            }
                                        }).catch(err => {
                                            return res.json({ message: err })
                                        })
                                }).catch(err => {
                                    return res.json({ message: err })
                                })
                        }
                    }).catch(err => {
                        return res.json({ message: err })
                    })
            }).catch(err => {
                return res.json({ message: err })
            })
    } else {
        return res.json({ message: 'Please check the PassWord' })
    }
}

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(20).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required()
})

export const LoginValidation = (req: UpdatedRequest, res: express.Response) => {
    const { email, password } = req.body.data
    loginSchema.validateAsync({ email, password })
        .then(validateLogin => {
            userModel.findOne({ email: email })
                .then(usermail => {
                    if (!usermail) {
                        return res.json({ message: 'please enter the valid email Id' })
                    } else {
                        bcrypt.compare(password, usermail.password as string)
                            .then(comparedpass => {
                                if (comparedpass) {
                                    if (process.env.Token_Securt) {
                                        let token = Jwt.sign({ _id: usermail._id }, process.env.Token_Securt)
                                        return res.json({ message: 'Logined Successfully !', User: usermail, tkn: token, Auth: true })
                                    }
                                } else {
                                    return res.json({ message: 'please check the password !' })
                                }
                            }).catch(err => {
                                return res.json({ message: err })
                            })
                    }
                })
                .catch(err => {
                    return res.json({ message: err })
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}
export const AuthStatus = (req: UpdatedRequest, res: express.Response) => {
    return res.json({ Auth: true, User: req.User })
}

const emailschema = Joi.object({
    email: Joi.string().email().required()
})
export const Forgetpassword = (req: UpdatedRequest, res: express.Response) => {
    const { email } = req.body.data
    emailschema.validateAsync({ email })
        .then(validemail => {
            userModel.findOne({ email: email })
                .then(responce => {
                    console.log(responce);

                    if (!responce) {
                        return res.json({ message: "please enter the valid email Id" })
                    } else {
                        TokenModel.findOne({ email: responce.email })
                            .then(tokenemail => {
                                if (!tokenemail) {
                                    TokenModel.create({
                                        email: responce.email,
                                        token: crypto.randomBytes(40).toString('hex'),
                                        expridate:setTimeout(()=>{
                                            Date.now()
                                        },1000)
                                    }).then(tokenuser=>{
                                        const Link =tokenuser.token
                                        console.log(Link);
                                        return res.json({ message: 'Reset password link had sent to you', token: Link })

                                    }

                                    )


                                    // Mailer({email:tokenemail.email,link:Link})



                                }
                            })
                            .catch(err => {
                                return res.json({ message: err })
                            })
                    }
                })
                .catch(err => {
                    return res.json({ message: err })
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

// export const Mailer = ({email, link}:MailerProps)=> {
//     console.log(email);
//     console.log(link);
//     const transporter =nodemailer.createTransport({
//         host:'smtp-relay.sendinblue.com',
//         port:587,
//         auth: {
//             user:'tsakthibala@gmail.com',
//             pass:'UIyMvDH6zZxjS49G'
//         }
//     })
//     transporter.sendMail({
//         from:'tsakthibala@gmail.com',
//         to:email,
//         subject:'Password Resetter email varification link',
//         html:`reset link <a src=${link}>${link}</a>`,
//         text:'Plece click the link to reset the password'
//     })
// }
const passwordschema=Joi.object({
    newpassword:Joi.string().max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$')).required(),
    conformpassword:Joi.string().max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$')).required()
})
export const resetpassword=(req:UpdatedRequest,res:express.Response)=>{
    const {newpassword,conformpassword}=req.body.data
    const token=req.params['token']
    if(newpassword===conformpassword){
        console.log('running');
        
        TokenModel.findOne({token:token})
        .then(tokenuserobject=>{
            console.log(tokenuserobject);
            
            if(!tokenuserobject){
                return res.json({message:'something went wrong'})
            }else{
                userModel.findOne({email:tokenuserobject.email})
                
                .then(userobject=>{
                    console.log(userobject);
                    if(!userobject){
                        return res.json({message:'something wents wrong'})
                    }else{
                        bcrypt.hash(newpassword,8)
                        .then(hashedpassword=>{
                            userModel.updateOne({email:userobject.email},{password:hashedpassword})
                            .then(result=>{
                                return res.json({message:'password updated successfully'})
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
        }).catch(err=>{
            return res.json({message:err})
        })

    }else{
        return res.json({message:'please check the inputs'})
    }
}
