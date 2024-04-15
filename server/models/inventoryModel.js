import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productWeight: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
    hsnCode: {
        type: String,
        required: true

    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;