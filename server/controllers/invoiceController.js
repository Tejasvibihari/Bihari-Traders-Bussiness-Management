import Invoice from '../models/invoiceModel.js';

export const addInvoice = async (req, res) => {
    const { invoiceno, date, gstin, aadhar, to, address, particulars, hsn, quantity, rate, amount, userId } = req.body;
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
            amount,
            userId
        });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        console.log(error);
    }
}

export const deleteInvoice = async (req, res) => {
    const { id, userId } = req.body;
    console.log(id);
    try {
        await Invoice.findByIdAndDelete(id);
        res.json({ message: "Invoice Deleted Successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getInvoices = async (req, res) => {
    const { userId } = req.body;
    try {
        const invoices = await Invoice.find({ userId });
        res.json(invoices);
    } catch (error) {
        console.log(error);
    }
}

export const updateInvoice = async (req, res) => {
    const { invoiceno, date, gstin, aadhar, to, address, particulars, hsn, quantity, rate, amount, invoiceId } = req.body;

    // Check if the address field is present in the request body
    if (!address) {
        console.log('Address field is missing in the request body');
    }

    console.log(req.body.address)
    console.log(req.body)

    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            { _id: invoiceId },
            {
                invoiceno: invoiceno,
                date: date,
                gstin: gstin,
                aadhar: aadhar,
                to: to,
                address: address,
                particulars: particulars,
                hsn: hsn,
                quantity: quantity,
                rate: rate,
                amount: amount
            },
            { new: true } // This option makes sure the updated document is returned
        );
        res.json({ message: "Invoice Updated Successfully", updatedInvoice })

    } catch (error) {
        console.log(error)
    }
}