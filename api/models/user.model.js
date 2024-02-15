import Mongoose from "mongoose";
import validator from 'validator';

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, 'Please provide a valid email address.']
    },
    password: {
        type: String,
        required: true
    }
    }, { timeStamp: true }
)

const User = Mongoose.model('User', userSchema);

export default User;