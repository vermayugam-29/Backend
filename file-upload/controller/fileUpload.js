const File = require('../models/file');

const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        // console.log("File ->" , file);
        const ext = file.name.split('.').at(-1);//getting extenstion pf uploaded file

        let path = __dirname + '/files/' + Date.now() + '.' + ext;//ye server ka path ha
        // console.log('Path ->',path);
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully'
        })
    } catch (error) {
        console.log(err);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder , quality) {
    const options = { folder };

    if(quality){
        options.quality = quality;
    }

    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.image;
        console.log(file);

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];

        const extension = file.name.split('.').at(-1).toLowerCase();

        if (!isFileTypeSupported(extension, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }


        //if file format supported upload on cloudinary
        const response = await uploadFileToCloudinary(file, 'practice');

        //db me entry karni ha
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'Internal server error'
        })
    }
}

exports.videoUpload = async (req, res) => {
    try {
        //fetch data
        const { name, tags, email } = req.body;
        const file = req.files.video;

        const sizeLimit = 50 * 1024 * 1024; //this is basically 50MB because file size commes in bytes
        //byte -> kb -> mb

        if (file.size > sizeLimit) {
            return res.json({
                success: false,
                message: 'File is too large'
            })
        }

        const extension = file.name.split('.').at(-1);

        const supportedTypes = ['mp4', 'mov'];
        
        if (!isFileTypeSupported(extension, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }

        //uploading to cloudinary
        const response = await uploadFileToCloudinary(file, 'practice' , 30);

        //save in database
        const savedData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error'
        })
    }
}

exports.imageReducerUpload = async (req, res) => {
    try {
        //fetch data
        const { name, tags, email } = req.body;
        const file = req.files.image;


        const extension = file.name.split('.').at(-1);

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        
        if (!isFileTypeSupported(extension, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }

        //uploading to cloudinary
        const response = await uploadFileToCloudinary(file, 'practice' , 90);

        //save in database
        const savedData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error'
        })
    }
}