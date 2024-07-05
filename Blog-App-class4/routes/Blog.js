const express = require('express');
const router = express.Router();

//Import Controller
const {createComment} = require('../controller/commentController');
const {createPost , getPosts} = require('../controller/postController');
const {likePost , unlikePost} = require('../controller/likeController');

//Create mapping of get , post , put
router.post('/comments/create' , createComment);
router.post('/posts/create' , createPost);
router.get('/posts' , getPosts);
router.post('/likes/like' , likePost);
router.post('/likes/unlike' , unlikePost);

//export
module.exports = router;