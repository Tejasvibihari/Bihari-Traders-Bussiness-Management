import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    brandCategory: {
        type: String,
        required: true
    }
})

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;