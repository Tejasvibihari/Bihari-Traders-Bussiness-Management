
import Grow from '@mui/material/Grow';
export default function InventoryCard() {
    return (
        <>
            <div>
                <Grow in="load">
                    <div className='flex flex-col max-w-64 h-64 border p-2 shadow-md'>
                        <div className="font-[montserrat] font-bold text-xl mb-1">Product Name</div>
                        <div className='text-sm text-gray-600'>
                            Brand Name
                        </div>
                        <div className="font-[montserrat] font-semibold text-slate-500 mt-20">Quantity - 987987</div>
                        <div className='font-[montserrat] text-slate-500 font-semibold mb-2'>
                            Bag 7889
                        </div>
                        <div>
                            <img src="" className='w-10' />
                        </div>
                        <div className='flex mb-2 '>
                            <div className="w-full flex justify-center items-center mb-2">
                                <button className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                        style={{
                                            backgroundImage: 'linear-gradient(110deg,#000103,40%,#1e2631,55%,#493657)',
                                            backgroundSize: '200% 100%',
                                            transition: 'background-position 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                        onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                    >
                                        Update
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Grow>
            </div>
        </>
    )
}
