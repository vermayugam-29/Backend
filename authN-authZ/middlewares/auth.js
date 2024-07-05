// 3 middlewares :- auth , isStudent , isAdmin

const jwt = require('jsonwebtoken');
const { logIn } = require('../controller/auth');
require('dotenv').config();

exports.auth = (req , res , next) => {
    try {
        //extract jwt token
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ','');


        if(!token) {
            return res.status(401).json({
                success : false, 
                message : 'token in missing'
            })
        }

        //verify token
        try {
            const payloadDecode = jwt.verify(token , process.env.JWT_SECRET);

            //the below line will now be used by isStudent and isAdmin
            req.user = payloadDecode;//stores payload which
            // contains role of user and can further be used for authorization
        } catch (error) {
            return res.status(401).json({
                success : false,
                message : 'token in invalid'
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        })
    }
}

exports.isStudent = (req , res , next) => {
    try {
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success : false,
                message : 'This is a protected route for student'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'User role is not matching'
        })
    }
}

exports.isAdmin = (req , res , next) => {
    try {
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success : false,
                message : 'This is a protected route for Admin'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'User role is not matching'
        })
    }
}