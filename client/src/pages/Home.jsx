
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon1 from '/image/cement1.gif'
import Icon2 from '/image/chem.gif'
import Icon3 from '/image/iron.gif'
import Icon4 from '../../public/image/stones1.png'
import Icon from '../../public/image/invoice1.gif'
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import SimpleLineChart from '../components/LineChart'

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
                <div className='flex flex-row gap-4'>
                    <div className=' card5 rounded-xl shadow-2xl overflow-hidden m-5'>
                        <div className='md:flex'>
                            <div className='md:flex-shrink-0'>
                                <img className='h-48 w-full  object-cover md:w-48' src={Icon} alt='Invoice icon' />
                            </div>
                            <div className='p-8'>
                                <div className='uppercase tracking-wide text-2xl font-extrabold'>Total invoice</div>
                                <div className='block mt-1 text-lg leading-tight font-semibold text-black'>4545</div>
                                <div className='mt-2 text-gray-900'>
                                    <div className='font-semibold text-xl'>Iron invoice: 45</div>
                                    <div className='font-semibold text-xl'>Chemical invoice: 45</div>
                                    <div className='font-semibold text-xl'>Stone invoice: 45</div>
                                    <div className='font-semibold text-xl'>Cement invoice: 45</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SimpleLineChart />
                    </div>
                </div>
            </Dashboard >
        </div >
    )
}
