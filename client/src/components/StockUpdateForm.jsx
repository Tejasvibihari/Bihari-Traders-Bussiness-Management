import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
export function StockInCementForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [inWeight, setInWeight] = useState('');
    const [inQuantity, setInQuantity] = useState('');
    const [finalQuantity, setFinalQuantity] = useState('');
    const [finalWeight, setFinalWeight] = useState('');

    const handleWeightChange = (event) => {
        const weight = event.target.value;
        setInWeight(weight);
        const quantity = weight / 50;
        setInQuantity(quantity);
    };

    useEffect(() => {
        const finalNumberWeight = Number(inWeight) + Number(product.weight);
        setFinalWeight(finalNumberWeight);
        const finalNumberQuantity = Number(inQuantity) + Number(product.quantity);
        setFinalQuantity(finalNumberQuantity);
    }, [inWeight, inQuantity, product.quantity, product.weight]);

    return (
        <>
            <div className='grid grid-cols-2 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Weight"
                        variant="outlined"
                        name="weight"
                        value={inWeight}
                        onChange={handleWeightChange}
                    />

                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        name="quantity"
                        value={inQuantity}
                    // You can add onChange handler if needed
                    />
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-2 gap-2 my-2 p-2'>
                    <div>
                        <input type='hidden' name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="Weight"
                            variant="outlined"
                            name="weight"
                            value={finalWeight}

                        />

                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Quantity"
                            variant="outlined"
                            name="quantity"
                            value={finalQuantity}
                        // You can add onChange handler if needed
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div >
            </form>
        </>
    );
}

export function StockOutCementForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [outWeight, setOutWeight] = useState('');
    const [outQuantity, setOutQuantity] = useState('');
    const [finalQuantity, setFinalQuantity] = useState("");
    const [finalWeight, setFinalWeight] = useState("");

    const handleQuantityChange = (event) => {
        const quantity = event.target.value;
        setOutQuantity(quantity);
        const weight = (quantity * 50)
        setOutWeight(weight);
    };
    useEffect(() => {
        const finalNumberWeight = Number(product.weight) - Number(outWeight);
        setFinalWeight(finalNumberWeight);
        const finalNumberQuantity = Number(product.quantity) - Number(outQuantity);
        setFinalQuantity(finalNumberQuantity);
    }, [finalQuantity, finalWeight, outQuantity, outWeight, product.quantity, product.weight]);

    return (
        <>
            <div className='grid grid-cols-2 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        name='quantity'
                        value={outQuantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Weight"
                        variant="outlined"
                        name='weight'
                        value={outWeight}

                    />
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-2 gap-2 my-2 p-2'>
                    <div>
                        <input type="hidden" name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="Quantity"
                            variant="outlined"
                            name='quantity'
                            value={finalQuantity}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Weight"
                            variant="outlined"
                            name='weight'
                            value={finalWeight}

                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export function StockInIronForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [inWeight, setInWeight] = useState(0);
    const [finalCalculatedweight, setFinalCalculatedweight] = useState(0);

    const handleWeightChange = (event) => {
        const weight = event.target.value;
        setInWeight(weight);
    };
    useEffect(() => {
        const numWeight = Number(product.weight);
        const numInWeight = Number(inWeight);
        setFinalCalculatedweight(numWeight + numInWeight);
    }, [inWeight, finalCalculatedweight, product.weight])
    return (
        <>
            <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Weight"
                        variant="outlined"
                        name='weight'
                        fullWidth
                        type='number'
                        value={inWeight}
                        onChange={handleWeightChange}
                    />
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                    <div>
                        <input type="hidden" name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="Weight"
                            variant="outlined"
                            name='weight'
                            fullWidth
                            type='number'
                            value={finalCalculatedweight}
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div >
            </form>
        </>
    );
}

export function StockOutIronForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [inWeight, setInWeight] = useState(0);
    const [finalCalculatedweight, setFinalCalculatedweight] = useState(0);

    const handleWeightChange = (event) => {
        const weight = event.target.value;
        setInWeight(weight);
    };
    useEffect(() => {
        const numWeight = Number(product.weight);
        const numInWeight = Number(inWeight);
        setFinalCalculatedweight(numWeight - numInWeight);
    }, [inWeight, finalCalculatedweight, product.weight])
    return (
        <>
            <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Weight"
                        variant="outlined"
                        name='weight'
                        fullWidth
                        type='number'
                        value={inWeight}
                        onChange={handleWeightChange}
                    />
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                    <div>
                        <input type="hidden" name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="Weight"
                            variant="outlined"
                            name='weight'
                            fullWidth
                            type='number'
                            value={finalCalculatedweight}
                            onChange={handleWeightChange}
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div >
            </form>
        </>
    );
}

export function StockInGitiForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [inCft, setInCft] = useState(0);
    const [finalCalculatedCft, setFinalCalculatedCft] = useState(0);

    const handleCftChange = (event) => {
        const cft = event.target.value;
        setInCft(cft);
    };
    useEffect(() => {
        const numCft = Number(product.cft);
        const numInCft = Number(inCft);
        setFinalCalculatedCft(numCft + numInCft);
    }, [inCft, finalCalculatedCft, product.cft])
    return (
        <>
            <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="CFT"
                        variant="outlined"
                        name='weight'
                        fullWidth
                        type='number'
                        value={inCft}
                        onChange={handleCftChange}
                    />
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                    <div>
                        <input type="hidden" name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="CFT"
                            variant="outlined"
                            name='weight'
                            fullWidth
                            type='number'
                            value={finalCalculatedCft}
                            onChange={handleCftChange}
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div >
            </form>
        </>
    );
}
export function StockOutGitiForm({ product, onSubmit }) {
    const loading = useSelector((state) => state.inventory.loading);
    const [outCft, setOutCft] = useState(0);
    const [finalCalculatedCft, setFinalCalculatedCft] = useState(0);

    const handleCftChange = (event) => {
        const cft = event.target.value;
        setOutCft(cft);
    };
    useEffect(() => {
        const numCft = Number(product.cft);
        const numOutCft = Number(outCft);
        setFinalCalculatedCft(numCft - numOutCft);
    }, [outCft, finalCalculatedCft, product.cft])
    return (
        <>
            <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="CFT"
                        variant="outlined"
                        name='weight'
                        fullWidth
                        type='number'
                        value={outCft}
                        onChange={handleCftChange}
                    />
                </div></div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 gap-2 my-2 p-2'>
                    <div>
                        <input type="hidden" name="id" value={product._id} />
                        <TextField
                            id="outlined-basic"
                            label="CFT"
                            variant="outlined"
                            name='weight'
                            fullWidth
                            type='number'
                            value={finalCalculatedCft}
                            onChange={handleCftChange}
                        />
                    </div>
                    <div className="col-span-2 w-full flex justify-center items-center mb-2 px-2">
                        <button type='submit' className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Updating Inventory" : "Update"}
                            </span>
                        </button>
                    </div>
                </div >
            </form>
        </>
    );
}

// ... rest of the code

StockInCementForm.propTypes = {
    product: PropTypes.shape({
        weight: PropTypes.number,
        quantity: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

StockOutCementForm.propTypes = {
    product: PropTypes.shape({
        weight: PropTypes.number,
        quantity: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

StockInIronForm.propTypes = {
    product: PropTypes.shape({
        weight: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

StockOutIronForm.propTypes = {
    product: PropTypes.shape({
        weight: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

StockInGitiForm.propTypes = {
    product: PropTypes.shape({
        cft: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

StockOutGitiForm.propTypes = {
    product: PropTypes.shape({
        cft: PropTypes.number,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
};