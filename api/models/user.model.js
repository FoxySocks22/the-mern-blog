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
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
    }
    }, { timeStamp: true }
)

const User = mongoose.model('User', userSchema);

export default User;