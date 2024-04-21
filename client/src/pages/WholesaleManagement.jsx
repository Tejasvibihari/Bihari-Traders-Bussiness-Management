import Dashboard from '../components/Dashboard'
import WholeSaleCard from '../components/WholeSaleCard'
import AddWholeSale from '../components/AddWholeSale'

export default function WholesaleManagement() {
    return (

        <Dashboard>

            <WholeSaleCard

                productname='Product Name'
                brand='Brand'
                weight='Weight'
                quantity='Quantity'
                cft='Cft'
                category='Category'
                clientName='Client Name'
            />

            <div className='fixed bottom-0 right-0 mb-10 mr-10'>
                <AddWholeSale />
            </div>
        </Dashboard>

    )
}
