const express = require('express');
const router = express.Router();

const User = require('../models/userData');

const { logIn , signUp} = require('../controller/auth');
const {auth , isStudent , isAdmin} = require('../middlewares/auth'); 

router.post('/login' , logIn);
router.post('/signup' , signUp);


router.get('/test' , auth , (req , res) => {
    res.json({
        success : true,
        message : 'Welcome to the protected route of Testing UI'
    })
})
//protected routes
router.get('/student' , auth , isStudent , (req , res) => {
    res.json({
        success : true,
        message : 'Welcome to the protected route of student'
    })
});

router.get('/admin' , auth , isAdmin , (req , res) => {
    res.json({
        success : true,
        message : 'Welcome to the protected route of Admin'
    })
});

router.get('/getEmail' , auth , async(req , res) => {
    try {
        const id = req.user.id;
        const user = await User.findById({_id : id});
        res.status(200).json({
            success : true,
            data : user
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message,
            message : 'Code fat gaya'
        })
    }
})

module.exports = router;