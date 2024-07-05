const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const db= require('./config/database');
db.connect();

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

const Upload = require('./routes/fileUpload');
app.use('/api/v1/upload' , Upload);

app.listen(PORT , () => {
    console.log(`Successfully connected at ${PORT}`);
})