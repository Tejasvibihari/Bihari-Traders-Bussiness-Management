import React from 'react'

export default function DialogCard({ productName, brand, weight, quantity, cft, category }) {
    return (
        <>
            <div>
                <div className='w-96 border p-2'>
                    <div className='flex flex-col px-2'>
                        <div className='flex flex-row justify-between'>
                            <div>
                                {productName}
                            </div>
                            <div>
                                {category}
                            </div>
                        </div>
                        <div>
                            {brand}
                        </div>
                        <div style={{ minHeight: '100px' }}> {/* Set a fixed height here */}
                            {weight &&
                                <div className='font-[montserrat] text-slate-500 mt-2 font-semibold mb-2 flex items-end'> {/* Reduce top margin here */}
                                    Weight:- {weight}
                                </div>
                            }
                            {quantity &&
                                <div className='font-[montserrat] text-slate-500 font-semibold mb-2 flex items-end'>
                                    Bag:- {quantity}
                                </div>
                            }
                            {cft &&
                                <div className='font-[montserrat] text-slate-500 mt-2 font-semibold mb-2 flex items-end'> {/* Reduce top margin here */}
                                    Cft:- {cft}
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
