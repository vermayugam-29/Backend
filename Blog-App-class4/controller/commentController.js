const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const createComment = async(req , res) => {
    try {
        const {post , user , body} = req.body;
        const comment = new Comment({
            post , user , body
        });
        const savedComment = await comment.save();
        //post vala collection ke andar comment ko push kana ha
        const updatedPost = await Post.findByIdAndUpdate(post , {$push : {comments : savedComment._id}} , {new : true})
                                    .populate('comments')
                                    .exec();

        res.status(200).json({
            post : updatedPost
        })
    } catch (err) {
        res.status(500).json({
            error : "Internal server error",
            message : err.message
        })
    }
}

module.exports = {createComment};