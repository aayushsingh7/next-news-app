const mongoose = require('mongoose')

const newsModel = new mongoose.Schema({
    title:{type:String,required:true},
    subtitle:{type:String,required:true},
    image:{type:String,required:true},
    tags:[String],
    discription:{type:String,required:true}
},{timestamps:true})

mongoose.models = {}

const News = mongoose.model.new ||  mongoose.model("new",newsModel)

export default News;
