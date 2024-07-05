const Blog = require('../models/BlogSchema');

const getPosts = async(req , res) => {
    try {
        const response = await Blog.find({});
        res.status(200).json(
            {
                success : true , 
                data : response,
                message : "Data Fetched"
            }
        )
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
}

module.exports = {getPosts};