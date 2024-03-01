import { errorHandler } from '../utils/error.js';
import Content from "../models/content.model.js"

export const publish = async(req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(
            403, 
            'Only admins can edit website content.'
            )
        )
    };
    try {
        const updatedPage = await Content.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    content: req.body.content,
                    updatedAt: Date.now()
                },
            }, { new: true }
        );
        res.status(201).json(updatedPage);
    } catch(error) {
        next(error);
    }
}

export const getPageContent = async(req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(
            403, 
            'Only admins can edit website content.'
            )
        )
    }
    try {
        const id = req.params.id;
        const content = await Content.findById( id );
        res.status(200).json(content);
    } catch(error) {
        next(error);
    }
}