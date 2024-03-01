import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    pageId: {
        type: String,
        select: false
    },
    content: {
        type: String,
        required: [true, 'Please provide content.'],
    },
    updatedAt: {
        type: Date,
        select: false
    },
})

const Content = mongoose.model('Content', contentSchema);

export default Content;