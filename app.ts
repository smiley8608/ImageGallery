import bodyParser = require('body-parser')
import express =require('express')
import mongoose from 'mongoose'
import Router from './router/userrouter'
import Cors =require ('cors') 
import ImageRouter from './router/imagerouter'
const app=express()

app.use(Cors({
    origin:'http://localhost:3000',
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',Router)
app.use('/image',ImageRouter)
app.use('/dbimages',express.static('dbimages'))
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