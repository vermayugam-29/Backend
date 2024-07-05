const Blog = require('../models/BlogSchema');

const createPost = async (req, res) => {
    try {
        const { name, post } = req.body;
        const respone = await Blog.create({ name, post });

        res.status(200).json(
            {
                success: true,
                data: respone,
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
};

module.exports = {createPost};