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
            { id: validUser._id },
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