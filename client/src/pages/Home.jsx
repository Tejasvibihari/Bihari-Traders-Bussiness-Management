
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon1 from '/image/cement1.gif'
import Icon2 from '/image/chem.gif'
import Icon3 from '/image/iron.gif'
import Icon4 from '/image/stones1.png'
import Icon from '/image/invoice1.gif'
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import SimpleLineChart from '../components/SimpleLineChart'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import client from '../service/axiosClient';
import { getInventorySuccess } from '../app/inventory/inventorySlice';
import { getInvoiceSuccess } from '../app/invoice/invoiceSlice';
import { getWholesaleSuccess } from '../app/wholesale/wholesaleSlice.js';

export default function Home() {

    const user = useSelector(state => state.user.currentUser);
    const invoices = useSelector(state => state.invoice.invoice);
    const inventory = useSelector(state => state.inventory.inventory);

    const dispatch = useDispatch()
    useEffect(() => {
        const getInventory = async () => {
            try {
                const userId = {
                    userId: user._id
                }
                const response = await client.post('/api/inventory/getinventory', userId);
                dispatch(getInventorySuccess(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        getInventory();
    }, [user._id, dispatch])
    // Get Data From data base of Wholesale 
    useEffect(() => {
        const getWholesale = async () => {
            try {
                const userId = {
                    userId: user._id
                }
                const response = await client.post('/api/inventory/wholesale/getwholesale', userId);
                console.log(response.data)
                dispatch(getWholesaleSuccess(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        getWholesale();
    }, [user._id, dispatch])

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const userId = {
                    userId: user._id
                }
                const response = await client.post('/api/invoice/getinvoices', userId);
                dispatch(getInvoiceSuccess(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices();
    }, [dispatch, user._id]);
    const cementInvoices = invoices.filter(invoice => invoice.particulars === "Cement");
    const ironInvoices = invoices.filter(invoice => invoice.particulars === "Iron");
    const cementInventory = inventory.filter(item => item.category === "Cement");
    const ironInventory = inventory.filter(item => item.category === "Iron");
    const stoneInventory = inventory.filter(item => item.category === "5/8" || item.category === "3/4");
    const chemicalInventory = inventory.filter(item => item.category === "Chemical");
    return (
        <div>
            <Dashboard>
                <Paper elevation={3} className='p-10'>
                    <Grow in timeout={{ enter: 500, exit: 500 }} style={{ transformOrigin: '0 0 0' }}>
                        <div className='flex flex-wrap gap-3'>
                            {/* First card */}
                            <DashBoardCard
                                title="Cement"
                                value={cementInventory.length}
                                icon={Icon1}
                                dynamicColor="card2"
                            />
                            {/* second card */}
                            <DashBoardCard
                                title="Chemical"
                                value={chemicalInventory.length}
                                icon={Icon2}
                                dynamicColor="card3"
                            />

                            {/* thrid card */}
                            <DashBoardCard
                                title="Iron"
                                value={ironInventory.length}
                                icon={Icon3}
                                dynamicColor="card4"
                            />

                            {/* forth Stone card  */}
                            <DashBoardCard
                                title="Stone"
                                value={stoneInventory.length}
                                icon={Icon4}
                                dynamicColor="card1"
                            />
                        </div>
                    </Grow >
                </Paper >
                {/* Total invoice card  and line chart */}
                <div className='my-4'>
                    <Paper elevation={3} className='p-5'>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <Grow in timeout={{ enter: 1500, exit: 500 }} style={{ transformOrigin: '0 0 0' }}>
                                <div className='flex items-center justify-center card5 rounded-xl shadow-gray-600 shadow-2xl overflow-hidden m-5 p-7'>
                                    <div className='flex items-center'>
                                        <img className='h-48 w-full  object-cover md:w-48' src={Icon} alt='Invoice icon' />
                                    </div>
                                    <div className='p-4 flex flex-row gap-4'>
                                        <div className=' flex flex-col items-center justify-ccenter'>
                                            <div className='inline-block text-lg uppercase tracking-wide font-extrabold font-[montserrat]'>Total invoice</div>
                                            <div className='mt-1 inline-block text-2xl leading-tight  font-semibold text-black text-center items-center justify-center py-7 px-3'>{invoices.length}</div>
                                        </div>
                                        <div className='mt-2 text-gray-900 flex items-center flex-col justify-center'>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Iron invoice:- {ironInvoices.length}</div>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Chemical invoice:- {cementInvoices.length}</div>
                                            {/* <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Stone invoice: 45</div>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Cement invoice: 45</div> */}
                                        </div>
                                    </div>
                                </div>
                            </Grow>
                            {/* Line chart */}
                            <Grow in timeout={{ enter: 2000, exit: 500 }} style={{ transformOrigin: '0 0 0' }}>
                                <div className='mx-auto flex justify-center items-center'>
                                    <SimpleLineChart />
                                </div>
                            </Grow>
                        </div>
                    </Paper>
                </div>
            </Dashboard >
        </div >
    )
}
