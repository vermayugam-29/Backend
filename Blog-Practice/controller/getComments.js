const Blog = require('../models/BlogSchema');

const getComments = async(req , res) => {
    try {
        const id = req.params.id;
        const response = await Blog.findById({_id : id});
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Fetched Comments successfully"
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

module.exports = {getComments};