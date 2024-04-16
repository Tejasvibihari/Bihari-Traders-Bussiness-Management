
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon from '/image/invoice1.gif'
import Icon1 from '/image/cement1.gif'
import Icon2 from '/image/chem.gif'
import Icon3 from '/image/iron.gif'
import Paper from '@mui/material/Paper';

export default function Home() {
    return (
        <div>
            <Dashboard>
                <Paper elevation={3} className='p-10'>
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
                </Paper>
                <div className='flex flex-row gap-4'>
                    <div>
                        Use card here
                    </div>
                    <div>
                        Use Line Chart Here
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}
