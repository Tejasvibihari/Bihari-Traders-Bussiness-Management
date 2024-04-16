import AddInventory from '../components/AddInventory'
import Dashboard from '../components/Dashboard'
import InventoryCard from '../components/InventoryCard'



export default function Inventory() {

    return (
        <div>
            <Dashboard>
                <InventoryCard />
                <div className='absolute bottom-0 right-0 mb-10 mr-10'>
                    <AddInventory />
                </div>
            </Dashboard>
        </div>
    )
}
