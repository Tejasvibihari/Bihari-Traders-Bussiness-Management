import Inventory from "../models/inventoryModel.js";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";

// Path: Bihari%20Traders%20Bussiness%20Management/server/controllers/inventoryController.js
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "manojbihari35@gmail.com",
        pass: "mbygodqftmlxenyl",
    },
});
export const addInventory = async (req, res) => {
    const { name, category, brand, weight, quantity, cft, hsnCode, userId } = req.body;
    try {
        const newInventory = new Inventory({
            name,
            category,
            brand,
            weight,
            quantity,
            cft,
            hsnCode,
            userId
        });
        await newInventory.save();

        res.status(201).json({ newInventory, message: "Product Added to Inventory successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getInventory = async (req, res) => {
    const { userId } = req.body;
    try {
        const inventory = await Inventory.find({ userId });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
        console.log(error)
    }
}


export const otpGeneration = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const info = await transporter.sendMail({
            from: '"Bihari Traders" <tejasvibihari2000@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Otp For Inventory Management", // Subject line
            text: `Your OTP is ${otp}`, // plain text body
            html: `Your OTP is ${otp}`, // html body
        });
        res.json({ message: "Otp sent successfully" });
        try {
            const user = await User.findOne({ email });
            if (user) {
                user.otp = otp;
                await user.save();
            }
        } catch (error) {
            console.log(error);
        }
        const createOtp = new User({ otp: otp });
        await createOtp.save();
    } catch (error) {
        console.log(error)
    }

}

export const updateInventory = async (req, res) => {
    const { id, quantity, weight, cft } = req.body;
    try {
        const updatedInventory = await Inventory.findOneAndUpdate(
            { _id: id },
            { $set: { quantity, weight, cft } },
            { new: true } // This option returns the updated document
        );
        // console.log(updatedInventory);
        res.json({ message: "Inventory updated successfully", data: updatedInventory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while updating the inventory" });
    }
};


