import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    bussinessName: {
        type: String,
        required: true
    },
    otp: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
export default User;