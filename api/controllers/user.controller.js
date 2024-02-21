import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'API is working.'
    })
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, 'You are not allowed to update this user.'));
    if(req.body.password) {
        if(req.body.password.length < 8) return next(errorHandler(400, 'Password must be at least 8 characters.'));
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if(req.body.username) {
        if(req.body.username.length < 7 || req.body.username.length > 20) return next(errorHandler(400, 'Username must be between 7 and 20 characters.'));
        if(req.body.username.includes(' ')) return next(errorHandler(400, 'Username cannot contain spaces.'));
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) return next(errorHandler(400, 'Username can only contain letters and numbers.'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                    updatedAt: Date.now()
                },
            }, { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch(error) {
        next(error);
    }
};

export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, 'You are not allowed to delete this user.'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User has been deleted.'
        })
    } catch(error) {
        next(error);
    }
}

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({
            messag: 'User signed out'
        })
    } catch(error) {
        next(error);
    }
}