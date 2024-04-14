import { useEffect, useState } from 'react'
import AddInvoiceTable from './AddInvoiceTable'
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function AddInvoiceForm() {
    const [formData, setFormData] = useState({
        invoiceno: '',
        date: '',
        gstin: '',
        aadhar: '',
        to: '',
        address: '',
        particulars: '',
        hsn: '',
        quantity: '',
        rate: '',
        amount: ''
    });
    const [invoice, setInvoice] = useState([]);
    const [invoiceno, setInvoiceno] = useState('');
    const [date, setDate] = useState('');
    const [gstin, setGstin] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [to, setTo] = useState('');
    const [address, setAddress] = useState('');
    const [particulars, setParticulars] = useState('');
    const [hsn, setHsn] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rate, setRate] = useState('');
    const [amount, setAmount] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'invoiceno':
                setInvoiceno(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'gstin':
                setGstin(value);
                break;
            case 'aadhar':
                setAadhar(value);
                break;
            case 'to':
                setTo(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'particulars':
                setParticulars(value);
                break;
            case 'hsn':
                setHsn(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'rate':
                setRate(value);
                break;
            case 'amount':
                setAmount(amount);
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        setAmount(rate * quantity);
        setFormData({ invoiceno, date, gstin, aadhar, to, address, particulars, hsn, quantity, rate, amount });
        console.log(invoice);
    }, [invoiceno, date, gstin, aadhar, to, address, particulars, hsn, quantity, rate, amount, invoice]);


    const handleInvoiceSubmit = async (event) => {
        event.preventDefault();
        setInvoice([...invoice, formData]);
        try {
            const invoiceDetail = await axios.post("/api/invoice/addinvoice", formData)
            console.log(invoiceDetail);
            setInvoiceno("");
            setDate("");
            setGstin("");
            setAadhar("");
            setTo("");
            setAddress("");
            setQuantity("");
            setRate("");
            setAmount("");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Paper elevation={3} sx={{ padding: 3 }} >
                <div className="text-black font-serif">
                    <h1 className='my-2 text-lg text-orange-800'>Add Invoice</h1>
                    <div>
                        <form>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <label className='text-lg'>Invoice No.<span className="text-red-700">*</span></label>
                                    <input type='number' name='invoiceno' value={invoiceno} onChange={handleInputChange} placeholder='Invoice No.' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>Date<span className="text-red-700">*</span></label>
                                    <input type='date' name='date' value={date} onChange={handleInputChange} placeholder='Date' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>GSTIN<span className="text-red-700"></span></label>
                                    <input type='text' name='gstin' value={gstin} onChange={handleInputChange} placeholder='GSTIN' className='w-full p-2 my-2 border border-gray-300 text-lg' />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>Aadhar No.<span className="text-red-700"></span></label>
                                    <input type='number' name='aadhar' value={aadhar} onChange={handleInputChange} placeholder='Adhar' className='w-full p-2 my-2 border border-gray-300 text-lg' />
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <label className='text-lg'>To M/s<span className="text-red-700">*</span></label>
                                    <input type='text' name='to' value={to} onChange={handleInputChange} placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>Address<span className="text-red-700">*</span></label>
                                    <input type='text' name='address' value={address} onChange={handleInputChange} placeholder='Address' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg font-[montserrat]'>Paticulars<span className="text-red-700">*</span></label>
                                    <select name="particulars" value={particulars} onChange={handleInputChange} className='w-full p-2 my-2 border border-gray-300 text-lg' required>
                                        <option>Select</option>
                                        <option value="Cement">Cement</option>
                                        <option value="Iron">Iron</option>
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg font-[montserrat]'>HSN Code<span className="text-red-700">*</span></label>
                                    <select name="hsn" value={hsn} onChange={handleInputChange} className='w-full p-2 my-2 border border-gray-300 text-lg' required>
                                        <option value="25232930">25232930</option>
                                        <option value="25232940">25232940</option>
                                        <option value="72142090">72142090</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='w-full'>
                                    <label className='text-lg'>Quantity<span className="text-red-700">*</span></label>
                                    <input type='number' name='quantity' value={quantity} onChange={handleInputChange} placeholder='Quantity' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>Rate<span className="text-red-700">*</span></label>
                                    <input type='number' name='rate' value={rate} onChange={handleInputChange} placeholder='Rate' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                                <div className='w-full'>
                                    <label className='text-lg'>Amount<span className="text-red-700">*</span></label>
                                    <input type='number' name='amount' value={amount} onChange={handleInputChange} placeholder='Amount' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button onClick={handleInvoiceSubmit} className='p-3 bg-black text-white hover:bg-white hover:text-black font-bold m-4 border hover:border-black' type="submit">Add Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Paper>
            <AddInvoiceTable invoice={invoice} />
        </>
    )
}
