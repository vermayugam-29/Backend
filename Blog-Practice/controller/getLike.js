const Blog = require('../models/BlogSchema');

const getLiked = async(req , res) => {
    try {
        const liked = await Blog.find({ like : true });
        res.status(200).json(
            {
                success: true,
                data: liked,
                message: "Liked successfully"
            }
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};

const getUnliked = async(req , res) => {
    try {
        const liked = await Blog.find({ like : false });
        res.status(200).json(
            {
                success: true,
                data: liked,
                message: "Unliked successfully"
            }
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};



module.exports = {getLiked , getUnliked};