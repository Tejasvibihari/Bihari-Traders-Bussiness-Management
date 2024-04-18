
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon1 from '/image/cement1.gif'
import Icon2 from '/image/chem.gif'
import Icon3 from '/image/iron.gif'
import Icon from '/image/invoice1.gif'
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import SimpleLineChart from '../components/SimpleLineChart'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { getInventorySuccess } from '../app/inventory/inventorySlice';

export default function Home() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const getInventory = async () => {
            try {
                const userId = {
                    userId: user.currentUser._id
                }
                const response = await axios.post('/api/inventory/getinventory', userId);
                dispatch(getInventorySuccess(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        getInventory();
    })
    return (
        <div>
            <Dashboard>
                <Paper elevation={3} className='p-10'>
                    <Grow in timeout={{ enter: 500, exit: 500 }} style={{ transformOrigin: '0 0 0' }}>
                        <div className='flex flex-wrap gap-3'>
                            {/* second card */}

                            <DashBoardCard
                                title="Cement"
                                value="345"
                                icon={Icon1}
                                dynamicColor="card2"
                            />


                            {/* third card */}

                            <DashBoardCard
                                title="Chemical"
                                value="345"
                                icon={Icon2}
                                dynamicColor="card3"
                            />

                            {/* Forth card */}

                            <DashBoardCard
                                title="Iron"
                                value="345"
                                icon={Icon3}
                                dynamicColor="card4"
                            />

                            {/* Change This for Stone  */}

                            <DashBoardCard
                                title="Total Invoice"
                                value="345"
                                icon={Icon}
                                dynamicColor="card1"
                            />
                        </div>
                    </Grow >
                </Paper >
                <div className='my-4'>
                    <Paper elevation={3} className='p-5'>
                        <div className='grid grid-cols-2 gap-4'>
                            <Grow in timeout={{ enter: 1500, exit: 500 }} style={{ transformOrigin: '0 0 0' }}>
                                <div className='flex items-center justify-center card5 rounded-xl shadow-gray-600 shadow-2xl overflow-hidden m-5 p-7'>
                                    <div className='flex items-center'>
                                        <img className='h-48 w-full  object-cover md:w-48' src={Icon} alt='Invoice icon' />
                                    </div>
                                    <div className='p-8 flex flex-row gap-4'>
                                        <div className=''>
                                            <div className='inline-block text-lg uppercase tracking-wide font-extrabold font-[montserrat]'>Total invoice</div>
                                            <div className='mt-1 inline-block text-2xl leading-tight  font-semibold text-black text-center items-center justify-center py-7 px-3'>4545</div>
                                        </div>
                                        <div className='mt-2 text-gray-900'>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Iron invoice: 45</div>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Chemical invoice: 45</div>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Stone invoice: 45</div>
                                            <div className='flex font-semibold text-lg whitespace-nowrap font-[montserrat]'>Cement invoice: 45</div>
                                        </div>
                                    </div>
                                </div>
                            </Grow>
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
