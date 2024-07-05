const express = require('express');
const router = express.Router();


const {createPost} = require('../controller/createPost');
const {getPosts} = require('../controller/getPosts')
const {createLike} = require('../controller/createLike');
const {getLiked , getUnliked} = require('../controller/getLike');
const {createComment} = require('../controller/createComment');
const {getComments} = require('../controller/getComments');

router.post('/createPost' , createPost);
router.get('/getPosts' , getPosts);
router.put('/likes/:id' , createLike);
router.get('/likes/like', getLiked);
router.get('/likes/unlike' , getUnliked);
router.put('/comment/:id' , createComment);
router.get('/comments/:id' , getComments);

module.exports = router;