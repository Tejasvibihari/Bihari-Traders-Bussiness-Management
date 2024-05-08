import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import client from '../service/axiosClient'
import { useDispatch, useSelector } from 'react-redux';
import { addInvoiceStart, addInvoiceSuccess, updateInvoice } from '../app/invoice/invoiceSlice'

export default function EditInvoiceDialogeForm({ invoiceId, handleClickOpen, open, handleClose }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.invoice.loading);
    const invoice = useSelector(state => state.invoice.invoice)
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

    // Add new state variables
    const [gstAmount, setGstAmount] = useState(0);
    const [totalGstAmount, setTotalGstAmount] = useState(0);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    useEffect(() => {
        const filterInvoice = invoice.filter(item => item._id === invoiceId)
        setInvoiceno(filterInvoice[0].invoiceno)
        setGstin(filterInvoice[0].gstin)
        setAadhar(filterInvoice[0].aadhar)
        setTo(filterInvoice[0].to)
        setAddress(filterInvoice[0].address)
        setParticulars(filterInvoice[0].particulars)
        setHsn(filterInvoice[0].hsn)
        setQuantity(filterInvoice[0].quantity)
        setRate(filterInvoice[0].rate)
        const dateObj = new Date(filterInvoice[0].date);
        const year = dateObj.getUTCFullYear();
        let month = dateObj.getUTCMonth() + 1; // Months are zero indexed, so +1
        let day = dateObj.getUTCDate();
        // If month or day are less than 10, prepend them with a 0
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }, [invoice, invoiceId])

    useEffect(() => {
        setAmount(rate * quantity);
    }, [rate, quantity]);
    // Add new useEffect hook
    useEffect(() => {
        const amount = quantity * rate;
        const cgstRate = particulars === "Cement" ? 0.14 : 0.09;
        const sgstRate = particulars === "Cement" ? 0.14 : 0.09;
        const cgstAmount = amount * cgstRate;
        const sgstAmount = amount * sgstRate;
        const totalGstAmount = cgstAmount + sgstAmount;
        setGstAmount(cgstAmount + sgstAmount);
        setTotalGstAmount(amount + totalGstAmount);
    }, [particulars, quantity, rate]);
    const handleEdit = async (e) => {
        e.preventDefault()
        console.log(address)
        const formData = {
            invoiceId, invoiceno, date, gstin, to, address, aadhar, particulars, hsn, quantity, rate, amount
        }
        try {
            dispatch(addInvoiceStart())
            const editResponse = await client.post("/api/invoice/updateinvoice", formData);
            console.log(editResponse.data.updatedInvoice);
            dispatch(updateInvoice(editResponse.data.updatedInvoice))
            // dispatch(addInvoiceSuccess())
            handleClose()
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg" // set maxWidth to large
                PaperProps={{ style: { width: '80%' } }}
            >
                <DialogTitle>Edit Invoice</DialogTitle>
                <DialogContent>

                    <form>
                        <div className='flex flex-row gap-4'>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Invoice No.<span className="text-red-700">*</span></label>
                                <input type='number' name='invoiceno' value={invoiceno} onChange={(e) => setInvoiceno(e.target.value)} placeholder='Invoice No.' className='w-full p-2 my-2 border border-gray-300 text-lg' required />                            </div>
                            <input type='text' value={invoiceId} hidden />
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Date<span className="text-red-700">*</span></label>
                                <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>GSTIN<span className="text-red-700"></span></label>
                                <input type='text' name='gstin' value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder='GSTIN' className='w-full p-2 my-2 border border-gray-300 text-lg' />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Aadhar No.<span className="text-red-700"></span></label>
                                <input type='number' name='aadhar' value={aadhar} onChange={(e) => setAadhar(e.target.value)} placeholder='Adhar' className='w-full p-2 my-2 border border-gray-300 text-lg' />
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>To M/s<span className="text-red-700">*</span></label>
                                <input type='text' name='to' value={to} onChange={(e) => setTo(e.target.value)} placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Address<span className="text-red-700">*</span></label>
                                <input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Paticulars<span className="text-red-700">*</span></label>
                                <select name="particulars" value={particulars} onChange={(e) => setParticulars(e.target.value)} className='w-full p-2 my-2 border border-gray-300 text-lg' required>
                                    <option>Select</option>
                                    <option value="Cement">Cement</option>
                                    <option value="Iron">Iron</option>
                                </select>
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>HSN Code<span className="text-red-700">*</span></label>
                                <select name="hsn" value={hsn} onChange={(e) => setHsn(e.target.value)} className='w-full p-2 my-2 border border-gray-300 text-lg' required>
                                    <option value="25232930">25232930</option>
                                    <option value="25232940">25232940</option>
                                    <option value="72142090">72142090</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4'>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Quantity<span className="text-red-700">*</span></label>
                                <input type='number' name='quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Rate<span className="text-red-700">*</span></label>
                                <input type='number' name='rate' value={rate} onChange={(e) => setRate(e.target.value)} placeholder='Rate' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Amount<span className="text-red-700">*</span></label>
                                <input type='number' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Gst Amount<span className="text-red-700">*</span></label>
                                <input type='number' name='gstamount' value={gstAmount} placeholder='Total Gst Amount' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                            <div className='w-full'>
                                <label className='text-lg font-[montserrat]'>Total Gst Amount<span className="text-red-700">*</span></label>
                                <input type='number' name='gstamount' value={totalGstAmount} placeholder='Total Gst Amount' className='w-full p-2 my-2 border border-gray-300 text-lg' required />
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            {/* <button onClick={handleInvoiceSubmit} className='p-3 bg-black text-white hover:bg-white hover:text-black font-bold m-4 border hover:border-black' type="submit">Add Invoice</button> */}
                            <button onClick={handleEdit} className="relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 font-[montserrat]">
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-slate-200 transition-all backdrop-blur-3xl"
                                    style={{
                                        backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                        backgroundSize: '200% 100%',
                                        transition: 'background-position 0.5s ease',
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                    onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                >
                                    {loading ? "Updating Invoice..." : "Update"}
                                </span>
                            </button>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}