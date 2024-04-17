import Dashboard from '../components/Dashboard'
import Paper from '@mui/material/Paper'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddInvoiceTable from '../components/AddInvoiceTable';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Invoice() {
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/invoice/getinvoices');
                setInvoices(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices();

    })


    return (
        <div>
            <Dashboard>
                <Paper elevation={3} sx={{ padding: 3 }} >
                    <div className='flex flex-row items-center gap-1'>
                        <span><FilterAltIcon /></span><div className='text-black font-[montserrat] text-lg'>Filter</div>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Name<span className="text-red-700">*</span></label>
                            <input type='text' name='to' placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]' required />
                        </div>
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Date From<span className="text-red-700">*</span></label>
                            <input type='text' name='to' placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]' required />
                        </div>
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Date To<span className="text-red-700">*</span></label>
                            <input type='text' name='to' placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]' required />
                        </div>
                        <div className='w-full'>
                            <label className='text-lg font-[montserrat]'>Particulars<span className="text-red-700">*</span></label>
                            <input type='text' name='to' placeholder='To M/s' className='w-full p-2 my-2 border border-gray-300 text-lg font-[montserrat]' required />
                        </div>
                    </div>



                    <div className='my-10'>
                        <AddInvoiceTable invoice={invoices} />
                    </div>
                </Paper>
            </Dashboard>
        </div >
    )
}
