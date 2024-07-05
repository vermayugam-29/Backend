const Post = require('../models/postModel');

exports.createPost = async(req , res) => {
    try {
        const {name , title , description} = req.body;
        const newPost = new Post({
            name , title , description
        });

        const savedPost = await newPost.save();

        res.status(200).json({
            data : savedPost
        })
    } catch (error) {
        res.status(500).json({
            error : "Internal Server error"
        })
    }
};

exports.getPosts = async(req , res) => {
    try {
        const posts = await Post.find().populate('comments').populate('likes');
        res.status(200).json({
            data : posts
        })
    } catch (error) {
        res.status(500).json({
            error : "Internal server error"
        })
    }
}