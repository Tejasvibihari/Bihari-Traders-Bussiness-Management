import mongoose from 'mongoose'

const wholesaleSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
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
    userId: {
        type: String,
        required: true
    }

});

const Wholesale = mongoose.model('Wholesale', wholesaleSchema);

export default Wholesale;