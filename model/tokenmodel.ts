import mongoose from "mongoose";
const tokenschems = new mongoose.Schema({
    email: {
        type: String,
        require: true
    }, token: {
        type: String,
        require: true
    },expridate:{
        type:Date,
        require:true
    }
})

const TokenModel=mongoose.model('token',tokenschems)

export default TokenModel