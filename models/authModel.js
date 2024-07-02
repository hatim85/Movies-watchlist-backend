import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    }
},{timestamps:true});

const User= mongoose.model('User', userSchema);
export default User;
