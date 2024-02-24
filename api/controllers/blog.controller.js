import { errorHandler } from '../utils/error.js';
import Blog from '../models/blog.model.js';

export const create = async(req, res, next) => {

    if(!req.user.isAdmin) return next(errorHandler(403, 'You are not allowed to create a post.'));
    if(!req.body.title || !req.body.content) return next(errorHandler(400, 'Please providea title and content for your post.'));

    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Blog ({
        userId: req.user.id,
        author: req.user.username,
        ...req.body, 
        slug
    })
    try {
        const postCreated = await newPost.save();
        res.status(201).json(postCreated);
    } catch(error) {
        next(error);
    }
}