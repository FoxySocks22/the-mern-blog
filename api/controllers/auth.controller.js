import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return next(errorHandler(400, 'All fields are bloody required.'));
    }
    if(!validator.isEmail(email)){
        return next(errorHandler(400, 'Please provide a valid email.'));
    } // For some reason running validators on model did not work
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email, 
        password: hashPassword
    })
    try {
        await newUser.save();
        res.json({
            message: "New user created!"
        })
    } catch(err){
        next(err.message)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return next(errorHandler(400, "All fields are required."));
    }
    try {
        const validUser = await User.findOne({ email });
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validUser || !validPassword) return next(errorHandler(404, "Invalid username of password."));
        const token = jwt.sign(
            { 
                id: validUser._id,
                isAdmin: validUser.isAdmin
             },
            process.env.JWT_SECRET
        );
        const { password: pass, ...mutatedUser } = validUser._doc; //Remove password from return object
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(mutatedUser);
    } catch(error) {
        return next(error);
    }
}

export const google = async(req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user){
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
            const { password, ...mutatedUser } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(mutatedUser);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.split(' ').toLowerCase().join('')+ Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture: googlePhotoUrl
            })
            await newUser.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...mutatedUser } = user._id;
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(mutatedUser);
        }
    } catch(error) {
        return next(error);
    }
}

// Refactor this file later, some reusability to be had here.