import Inventory from "../models/inventoryModel.js";
import nodemailer from "nodemailer";

// Path: Bihari%20Traders%20Bussiness%20Management/server/controllers/inventoryController.js

export const addInventory = async (req, res) => {
    const { productName, productCategory, productPrice, productWeight, productQuantity, productImage, hsnCode } = req.body;
    try {
        const newInventory = new Inventory({ productName, productCategory, productPrice, productWeight, productQuantity, productImage, hsnCode });
        await newInventory.save();
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
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


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "manojbihari35@gmail.com",
        pass: "mbygodqftmlxenyl",
    },
});

export const otpGeneration = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        try {
            const info = await transporter.sendMail({
                from: '"Bihari Traders" <gamingwiz8011@gmail.com>', // sender address
                to: "tejasvibihari2000@gmail.com", // list of receivers
                subject: "Otp For Inventory Management", // Subject line
                text: `Your OTP is ${otp}`, // plain text body
                html: `Your OTP is ${otp}`, // html body
            });
            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
}


export const updateInventory = async (req, res) => {
    const { productName, productCategory, productPrice, productWeight, productQuantity, productImage, hsnCode } = req.body;
    try {
        const upadateInventory = await Inventory.findById(req.params.id);
        upadateInventory.productQuantity = productQuantity;

        await updateInventory.save();
        res.json(updateInventory);
    } catch (error) {
        console.log(error);
    }
}