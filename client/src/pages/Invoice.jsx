import Dashboard from '../components/Dashboard'
import Paper from '@mui/material/Paper'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddInvoiceTable from '../components/AddInvoiceTable';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { getInvoiceSuccess, addFilterInvoice } from '../app/invoice/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Invoice() {
    const invoices = useSelector(state => state.invoice.invoice);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [nameFilter, setNameFilter] = useState('');
    const [fromDateFilter, setFromDateFilter] = useState('');
    const [toDateFilter, setToDateFilter] = useState('');
    const [particularFilter, setParticularFilter] = useState('');
    const [invoiceNoFilter, setInvoiceNoFilter] = useState("");
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const userId = {
                    userId: user._id
                }
                const response = await axios.post('/api/invoice/getinvoices', userId);
                console.log(response.data);
                dispatch(getInvoiceSuccess(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices();
    }, [dispatch, user._id]);
    const filteredInvoices = invoices.filter(invoice => {
        const nameMatches = !nameFilter || (invoice.to && invoice.to.toLowerCase().includes(nameFilter.toLowerCase()));
        const dateMatches = (!fromDateFilter && !toDateFilter) || (invoice.date >= fromDateFilter && invoice.date <= toDateFilter);
        const particularMatches = !particularFilter || (invoice.particulars && invoice.particulars.toLowerCase().includes(particularFilter.toLowerCase()));
        const invoiceNoMatches = !invoiceNoFilter || (invoice.invoiceno && invoice.invoiceno === Number(invoiceNoFilter));
        return nameMatches && dateMatches && particularMatches && invoiceNoMatches;
    });
    useEffect(() => {
        dispatch(addFilterInvoice(filteredInvoices));
    }, [filteredInvoices, dispatch])

    return (
        <div>
            {/* Dashboard and Paper components */}
            <Dashboard>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <div>
                        <FilterAltIcon />
                    </div>
                    {/* Filter input fields */}
                    <div className='flex flex-row gap-4'>
                        {/* Name filter */}
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Name</label>
                            <input
                                type='text'
                                name='to'
                                placeholder='To M/s'
                                className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]'
                                value={nameFilter}
                                onChange={e => setNameFilter(e.target.value)}
                            />
                        </div>
                        {/* Date from filter */}
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Date From</label>
                            <input
                                type='date'
                                name='fromDate'
                                placeholder='From Date'
                                className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]'
                                value={fromDateFilter}
                                onChange={e => setFromDateFilter(e.target.value)}
                            />
                        </div>
                        {/* Date to filter */}
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Date To</label>
                            <input
                                type='date'
                                name='toDate'
                                placeholder='To Date'
                                className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]'
                                value={toDateFilter}
                                onChange={e => setToDateFilter(e.target.value)}
                            />
                        </div>
                        {/* Particulars filter */}
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Particulars</label>
                            <input
                                type='text'
                                name='particular'
                                placeholder='Particulars'
                                className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]'
                                value={particularFilter}
                                onChange={e => setParticularFilter(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-80'>
                            <label className='text-lg font-[montserrat]'>Invoice Number</label>
                            <input
                                type='number'
                                name='invoiceNo'
                                placeholder='Invoice Number'
                                className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]'
                                value={invoiceNoFilter}
                                onChange={e => setInvoiceNoFilter(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='my-4'>
                        <div className='flex items-end justify-end'>
                            <Link to="/viewinvoice">
                                <button className="relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                        style={{
                                            backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                            backgroundSize: '200% 100%',
                                            transition: 'background-position 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                        onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                    >
                                        Get Invoice
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </Paper>
                {/* ReactToPrint and AddInvoiceTable components */}
                <div className='my-10'>

                    <AddInvoiceTable invoice={filteredInvoices} />
                </div>

            </Dashboard>
        </div>
    );
}
