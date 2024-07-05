const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema(
    {
        name : {
            type : String , 
            required : true
        } ,
        imageUrl : {
            type : String
        } , 
        tags : {
            type : String
        } ,
        email : {
            type : String
        }
    }
);

//post middleware
fileSchema.post('save' , async function(doc){
    try {
       console.log('Doc' , doc)
       
       //transporter
       let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
       })

       //send mail
       let info = await transporter.sendMail({
        from : `Problem-Solving  by yugam`,
        to : doc.email,
        subject : 'New  File uploaded oon cloudinary',
        html : `<h2>Ram Ram</h2> <p>File Uploaded</p> View here <a href=${doc.imageUrl}>Click Here</a>`
       })

    } catch (error) {
        console.error(error.message);  
    }
});

const File = mongoose.model('File' , fileSchema);
module.exports = File;