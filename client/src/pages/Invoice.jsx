import Dashboard from '../components/Dashboard'
import Paper from '@mui/material/Paper'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddInvoiceTable from '../components/AddInvoiceTable';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { getInvoiceSuccess } from '../app/invoice/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Invoice() {
    const invoices = useSelector(state => state.invoice.invoice);
    const dispatch = useDispatch();

    const [nameFilter, setNameFilter] = useState('');
    const [fromDateFilter, setFromDateFilter] = useState('');
    const [toDateFilter, setToDateFilter] = useState('');
    const [particularFilter, setParticularFilter] = useState('');

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/invoice/getinvoices');
                dispatch(getInvoiceSuccess(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices();
    }, [dispatch]);
    const filteredInvoices = invoices.filter(invoice => {
        const nameMatches = !nameFilter || (invoice.to && invoice.to.toLowerCase().includes(nameFilter.toLowerCase()));
        const dateMatches = (!fromDateFilter && !toDateFilter) || (invoice.date >= fromDateFilter && invoice.date <= toDateFilter);
        const particularMatches = !particularFilter || (invoice.particulars && invoice.particulars.toLowerCase().includes(particularFilter.toLowerCase()));
        return nameMatches && dateMatches && particularMatches;
    });
    // const filteredsInvoices = invoices.filter(invoice => {
    //     const nameMatches = invoice.to && invoice.to.toLowerCase().includes(nameFilter.toLowerCase());
    //     const dateMatches = !fromDateFilter || !toDateFilter || (
    //         new Date(invoice.date) >= new Date(fromDateFilter) &&
    //         new Date(invoice.date) <= new Date(toDateFilter)
    //     );
    //     const particularMatches = invoice.particular && invoice.particular.toLowerCase().includes(particularFilter.toLowerCase());
    //     return nameMatches && dateMatches && particularMatches;
    // });
    return (
        <div>
            {/* Dashboard and Paper components */}
            <Dashboard>
                <Paper elevation={3} sx={{ padding: 3 }}>
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
                    {/* ReactToPrint and AddInvoiceTable components */}
                    <div className='my-10'>
                        <ReactToPrint
                            trigger={() => <button>Download</button>}
                            content={() => componentRef.current}
                        />
                        <AddInvoiceTable invoice={filteredInvoices} />
                    </div>
                </Paper>
            </Dashboard>
        </div>
    );
}
