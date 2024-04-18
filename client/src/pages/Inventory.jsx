import AddInventory from '../components/AddInventory'
import Dashboard from '../components/Dashboard'
import InventoryCard from '../components/InventoryCard'
import { useSelector } from 'react-redux'


export default function Inventory() {
    const inventory = useSelector(state => state.inventory.inventory)
    console.log(inventory)
    return (
        <div>
            <Dashboard>
                <div className='grid grid-cols-5 items-center justify-center'>
                    {inventory.map((item, index) => (
                        <InventoryCard
                            key={index}
                            productname={item.name}
                            brand={item.brand}
                            weight={item.weight}
                            quantity={item.quantity}
                            cft={item.cft}
                        />))}
                </div>
                <div className='absolute bottom-0 right-0 mb-10 mr-10'>
                    <AddInventory />
                </div>
            </Dashboard>
        </div>
    )
}
