
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon from '../../public/image/invoice1.gif'


export default function Home() {
    return (
        <div>
            <Dashboard>
                <div className='flex flex-wrap gap-3'>
                    <DashBoardCard
                        title="Total Invoice"
                        value="345"
                        icon={Icon}
                        // color="purpleToPink"
                        dynamicColor="card1"
                    />

                    {/* second card */}
                    <DashBoardCard
                        title="Total Invoice"
                        value="345"
                        icon={Icon}
                        dynamicColor="card2"
                    // color="pinkToBlue"

                    />
                    {/* third card */}

                    <DashBoardCard
                        title="Total Invoice"
                        value="345"
                        icon={Icon}
                        dynamicColor="card3"
                    // color="yellowToRed"
                    />
                    {/* Forth card */}
                    <DashBoardCard
                        title="Total Invoice"
                        value="345"
                        icon={Icon}
                        dynamicColor="card4"
                    // color="yellowToPink"
                    />

                </div>
            </Dashboard>
        </div>
    )
}
