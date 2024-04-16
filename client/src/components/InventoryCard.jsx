
import Grow from '@mui/material/Grow';
export default function InventoryCard() {
    return (
        <>
            <div>
                <Grow in="load">
                    <div className='flex flex-col max-w-64 h-64 border p-4 shadow-md'>
                        <div className="font-[montserrat] font-bold text-xl mb-4">Product Name</div>
                        <div className="font-[montserrat] font-semibold text-slate-500 mt-20">Quantity - 987987</div>
                        <div className='font-[montserrat] text-slate-500 font-semibold mb-2'>
                            Bag 7889
                        </div>
                        <div>
                            <img src="" className='w-10' />
                        </div>
                        <div className='flex'>
                            <div className='p-2 border w-full text-center bg-black text-white hover:text-black hover:bg-white hover:border-black'>
                                Update
                            </div>
                        </div>
                    </div>
                </Grow>
            </div>
        </>
    )
}
