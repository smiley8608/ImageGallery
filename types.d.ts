import express = require('express')
import { string } from 'joi'
export interface UserProps {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string
}

export interface UpdatedRequest extends express.Request{
    User:UserProps,
    Auth:boolean
}

export interface RouterProps extends express.IRouter  {
    post: (path:string,...middleware) => any
    get: (path:string,...middleware) => any
}

export interface UpdatedImagetype extends express.Request{
    email:UpdatedRequest,
    path:Express.Multer.File[]
}

