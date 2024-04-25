import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "manojbihari35@gmail.com",
        pass: "mbygodqftmlxenyl",
    },
});

export const signUp = async (req, res) => {
    const { name, email, password, bussinessName, address, gstin, mobile } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const createUser = await User.create({
            name,
            email,
            password: hashedPassword,
            bussinessName,
            address,
            gstin,
            mobile
        });
        try {
            const info = await transporter.sendMail({
                from: '"Bihari Traders" <tejasvibihari2000@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account Created Success", // Subject line
                text: `Thank You For Using Our Service`, // plain text body
                html: `Thank You For Using Our Service`, // html body
            });
            console.log("Message sent: %s", info.messageId);

        } catch (error) {
            console.log(error)
        }
        return res.status(201).json({ user: createUser, message: "User created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
const SECRET_KEY = "BIHARITRADERS"
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign({ userId: existingUser._id }, SECRET_KEY, { expiresIn: '1h' });

        // Set cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour in milliseconds
        });

        // Send response with user and token
        res.status(200).json({ user: existingUser, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // Generate a token
        // const token = crypto.randomBytes(32).toString('hex');
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        // Associate the token with the user in the database
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send an email to the user with the token
        // This would be done with a real email service in a production application
        try {
            const info = await transporter.sendMail({
                from: '"Bihari Traders" <tejasvibihari2000@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Otp For Reset Your Password", // Subject line
                text: `Your OTP is ${token}`, // plain text body
                html: `Your OTP is ${token}`, // html body
            });
            console.log("Message sent: %s", info.messageId);

        } catch (error) {
            console.log(error)
        }

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password and update it in the database
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRound);
        user.password = hashedPassword;

        // Clear the reset token and expiration time
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateAccount = async (req, res) => {
    const { id, bussinessName, name, mobile, gstin, address } = req.body
    const image = req.file.filename;
    try {
        const findUser = await User.findOneAndUpdate(
            { _id: id },
            { bussinessName, name, mobile, gstin, address, image },
            { new: true })

        res.json({ user: findUser, message: "User updated" })
    } catch (error) {
        res.json({ error, message: "Something went wrong" })
    }
}