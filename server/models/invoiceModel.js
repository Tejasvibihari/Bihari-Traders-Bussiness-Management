import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    invoiceno: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    gstin: {
        type: String
    },
    aadhar: {
        type: Number
    },
    to: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    particulars: {
        type: String,
        required: true
    },
    hsn: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice