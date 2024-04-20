import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
