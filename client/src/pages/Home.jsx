
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

export default function Home() {
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
                                        <div>
                                            <div className='uppercase tracking-wide text-lg font-extrabold'>Total invoice</div>
                                            <div className='mt-1 text-2xl  leading-tight font-semibold text-black text-center flex items-center justify-center py-7'>4545</div>
                                        </div>
                                        <div className='mt-2 text-gray-900'>
                                            <div className='font-semibold text-lg'>Iron invoice: 45</div>
                                            <div className='font-semibold text-lg'>Chemical invoice: 45</div>
                                            <div className='font-semibold text-lg'>Stone invoice: 45</div>
                                            <div className='font-semibold text-lg'>Cement invoice: 45</div>
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
