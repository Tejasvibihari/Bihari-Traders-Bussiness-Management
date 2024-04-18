import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    weight: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    cft: {
        type: Number,
    },
    hsnCode: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;