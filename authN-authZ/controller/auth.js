const bcrypt = require('bcrypt');
const rounds = 10;

const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/userData');

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, rounds);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error is hashing password"
            })
        } ''


        const user = new User({
            name, email, password: hashedPassword, role
        });
        const savedData = await user.save();

        res.status(200).json({
            success: true,
            data: savedData
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.logIn = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;

        //validation on email and pass
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            })
        }

        let existsUser = await User.findOne({ email });

        //if no such user exists
        if (!existsUser) {
            return res.status(401).json({
                success: false,
                message: "Please sign up before logging in"
            })
        }

        const payload = {
            email : existsUser.email,
            id : existsUser._id,
            role : existsUser.role
        }
        //verify pass and generate a jwt token
        if(await bcrypt.compare(password , existsUser.password)){
            //creating jwt password
            let token = jwt.sign(payload , process.env.JWT_SECRET,
                {
                    expiresIn : '2h'
                }
            );

            existsUser = existsUser.toObject();
            existsUser.token = token;
            existsUser.password = undefined;
            const options = {
               expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) ,
               httpOnly : true
            }
            return res.cookie('token' , token , options).status(200).json({
                success : true,
                token,
                existsUser,
                message : 'User logged in successfully'
            })
        }
        res.status(403).json({
            success : false,
            message : 'Incorrect Password'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}