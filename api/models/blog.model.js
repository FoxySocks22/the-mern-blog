import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a title.'],
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ['JavaScript', 'React.js', 'Node.js', 'Shopify', 'WordPress', 'PHP', 'SASS', 'Front-end', 'Back-end']
    },
    content: {
        type: String,
        required: [true, 'Please provide content for your blog.'],
        unique: true
    },
    blogPicture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        select: false
    }
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;