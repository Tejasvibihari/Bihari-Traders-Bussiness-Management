import Invoice from '../models/invoiceModel.js';

export const addInvoice = async (req, res) => {
    const { invoiceno, date, gstin, aadhar, to, address, particulars, hsn, quantity, rate, amount } = req.body;
    console.log(req.body)
    try {
        const invoice = new Invoice({
            invoiceno,
            date,
            gstin,
            aadhar,
            to,
            address,
            particulars,
            hsn,
            quantity,
            rate,
            amount
        });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        console.log(error);
    }
}

export const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).send();
        }
        res.send(invoice);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({});
        res.json(invoices);
    } catch (error) {
        console.log(error);
    }
}