import bcrypt from 'bcryptjs'
import express = require('express')
import dotenv from 'dotenv'
import Jwt from 'jsonwebtoken'
import { UpdatedRequest, UserProps } from '../types'
import userModel from '../model/usermodel'
dotenv.config()

const middleware = (req: UpdatedRequest, res: express.Response, next: express.NextFunction) => {
    const envSecurt = process.env.Token_Securt
    const Token = req.headers['jwt-token'] as string

    if (Token && envSecurt) {
        try {
            const varify = Jwt.verify(Token, envSecurt)
            const decodedToken:any = Jwt.decode(Token)
            if (req.path === '/signin' || req.path === '/login') {
                return res.json({ message: 'Invalid entry' })
            } else {
                if (req.path !== '/sign' && req.path !== '/login') {
                    userModel.findById(decodedToken.id)
                    .then(responce=>{
                        req.User=responce as unknown as UserProps
                        next()
                    })
                    .catch(err=>{
                        return res.json({message:err}) 
                    })
                }
            }
        } catch (error) {
            if (req.path === '/signin' || req.path === '/login') {
                next()
            } else {
                return res.json({ message: 'your account is not valid' })
            }
        }
    } else {
        if (req.path === '/signin' || req.path === '/login') {
            next()
        } else {
            return res.json({ User: null, Auth: false })
        }
    }

}

export default middleware