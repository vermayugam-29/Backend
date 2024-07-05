const Blog = require('../models/BlogSchema');

const createComment = async(req , res) => {
    try {
        const {id} = req.params;
        const {comments} = req.body;
        const response = await Blog.findByIdAndUpdate(
            {_id : id},
            {comments , updatedAt : Date.now()}
        );

        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Commented successfully"
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

module.exports = {createComment};