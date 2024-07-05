const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        name : {
            type : String , 
            required : true
        } ,
        post : {
            type : String ,
            required : true ,
        } ,
        like : {
            type : Boolean,
            required : false ,
            default : false
        } ,
        comments : {
            type : Array ,
            required : false,
            default : ["No comments yet"]
        } ,
        createdAt : {
            type : Date ,
            required : false,
            default : Date.now()
        } , 
        updatedAt : {
            type : Date , 
            required : false,
            default : Date.now()
        }
    }
)

module.exports = mongoose.model("Blog" , BlogSchema);