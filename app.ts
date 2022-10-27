import bodyParser = require('body-parser')
import express =require('express')
import mongoose from 'mongoose'
import Router from './router/userrouter'
const app=express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',Router)

mongoose.connect('mongodb://localhost:27017/gallary',(err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log('Database connected successfully !');
        app.listen(3002,()=>{
            console.log('server connected to the port 3002 !');
        })
        
    }
})