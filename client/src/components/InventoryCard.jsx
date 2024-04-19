import Grow from '@mui/material/Grow';
import { Link } from "react-router-dom";

export default function InventoryCard({ productname, brand, weight, quantity, cft, category, handleClick }) {
    return (
        <>
            <div className='flex justify-center items-center mb-7'>
                <Grow in="load">
                    <div className='relative flex flex-col my-4 w-60 h-60 border p-4 shadow-md hh bg-gray-200'>
                        {/* <div className="back-content  w-40 h-full bg-gradient-to-r from-transparent via-red-500 to-transparent animate-rotation"></div> */}
                        <div className='flex justify-between'>
                            <div className="font-[montserrat] font-bold text-xl mb-1">{productname}</div>
                            <div>
                                {category}
                            </div>
                        </div>
                        <div className='text-sm text-gray-600'>
                            {brand}
                        </div>

                        <div style={{ minHeight: '100px' }}> {/* Set a fixed height here */}
                            {weight &&
                                <div className='font-[montserrat] text-slate-500 mt-2 font-semibold mb-2'> {/* Reduce top margin here */}
                                    Weight:- {weight}
                                </div>
                            }
                            {quantity &&
                                <div className='font-[montserrat] text-slate-500 font-semibold mb-2'>
                                    Bag:- {quantity}
                                </div>
                            }
                            {cft &&
                                <div className='font-[montserrat] text-slate-500 mt-2 font-semibold mb-2'> {/* Reduce top margin here */}
                                    Cft:- {cft}
                                </div>
                            }
                        </div>
                        <div>
                            <img src="" className='w-10' />
                        </div>

                        {/* <Link to={link}> */}
                        <div className='flex mb-2 '>
                            <div className="w-full flex justify-center items-center mb-2">
                                <button className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                        style={{
                                            backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                            backgroundSize: '200% 100%',
                                            transition: 'background-position 0.5s ease',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                        onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                                        onClick={handleClick}
                                    >
                                        Update
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/* </Link> */}

                    </div>
                </Grow >
            </div>
        </>
    )
}