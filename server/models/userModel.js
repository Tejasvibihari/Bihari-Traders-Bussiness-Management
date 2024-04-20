import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    gstin: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
});

const User = mongoose.model('User', userSchema);
export default User;