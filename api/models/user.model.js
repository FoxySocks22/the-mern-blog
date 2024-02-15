import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    },
    profilePicture: {
        type: String,
        default: 'https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const User = mongoose.model('User', userSchema);

export default User;