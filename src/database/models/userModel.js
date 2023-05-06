import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name:{type:String,trim:true},
    email:{unique:true,type:String,required:true},
    password:{required:true,type:String},
},{timestamps:true})

mongoose.models = {}

const User = mongoose.model.user ||  mongoose.model("user",userModel)

export default User;