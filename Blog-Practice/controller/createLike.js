const Blog = require('../models/BlogSchema');

const createLike = async(req , res) => {
    try {
        const {id} = req.params;
        const {like} = req.body;

        const liked = await Blog.findByIdAndUpdate(
            {_id : id} , 
            {like , updatedAt : Date.now()}
        );

        res.status(200).json(
            {
                success: true,
                data: liked,
                message: "Post created successfully"
            }
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
}

module.exports = {createLike};