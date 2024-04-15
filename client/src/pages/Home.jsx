
import Dashboard from '../components/Dashboard'
import DashBoardCard from '../components/DashBoardCard'
import Icon from '../../public/image/invoice1.gif'
import Icon1 from '../../public/image/cement1.gif'
import Icon2 from '../../public/image/chem.gif'
import Icon3 from '../../public/image/iron.gif'


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
                        title="Cement"
                        value="345"
                        icon={Icon1}
                        dynamicColor="card2"
                    // color="pinkToBlue"

                    />
                    {/* third card */}

                    <DashBoardCard
                        title="Chemical"
                        value="345"
                        icon={Icon2}
                        dynamicColor="card3"
                    // color="yellowToRed"
                    />
                    {/* Forth card */}
                    <DashBoardCard
                        title="Iron"
                        value="345"
                        icon={Icon3}
                        dynamicColor="card4"
                    // color="yellowToPink"
                    />

                </div>
            </Dashboard>
        </div>
    )
}
