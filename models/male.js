const mongoose = require('mongoose')
const Schema = mongoose.Schema

const maleSchema = new Schema({

    name: {type:String, required:true},
    email: {type:String, required:true},
    phone: {type:String, required:true},
    hobbies: {type:String, required:true},
    employment_status:{type:String, required:true},
    marital_status:{type:String, required:true},
    age:{type:String, required:true}



})

module.exports = mongoose.model("Male",maleSchema)