import Inventory from "../models/inventoryModel";
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
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
    },
});

export const otpGeneration = async (req, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

    } catch (error) {

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