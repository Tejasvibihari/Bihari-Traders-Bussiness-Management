import User from "../models/userModel.js";
import bcrypt from "bcrypt";


export const signUp = async (req, res) => {
    const { name, email, password, bussinessName } = req.body;
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
            bussinessName
        });

        return res.status(201).json({ user: createUser, message: "User created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        !existingUser ? res.status(404).json({ message: "User doesn't exist" }) : null;

        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        !passwordCheck ? res.status(400).json({ message: "Invalid credentials" }) : null;
        res.status(200).json({ existingUser, message: "Signin successfull" });

    } catch (error) {
        console.log(error);
    }
}