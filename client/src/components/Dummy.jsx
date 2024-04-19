import * as React from 'react';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PropTypes from 'prop-types';


export default function InventoryUpdateForm({ product }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [quantity, setQuantity] = useState('')
    const [weight, setWeight] = useState('')
    const [cft, setCft] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            weight: weight,
            quantity: quantity,
            cft: cft
        }
        try {
            const response = axios.post('/api/inventory/update', formData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    function StockIn({ selected }) {
        return (
            <div className={`border py-1 px-3 font-[montserrat] rounded-md ${selected ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-red-600'}`}>
                Stock In
            </div>
        )
    }

    function StockOut({ selected }) {
        return (
            <div className={`border py-1 px-3 font-[montserrat] rounded-md ${selected ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-red-600'}`}>
                Stock Out
            </div>
        )
    }

    function StockInCementForm() {
        const [inWeight, setInWeight] = useState('');
        const [inQuantity, setInQuantity] = useState('');
        const [finalQuantity, setFinalQuantity] = useState("");
        const [finalWeight, setFinalWeight] = useState("");

        const handleWeightChange = (event) => {
            const weight = event.target.value;
            setInWeight(weight);
            const quantity = (weight / 50)
            setInQuantity(quantity);
        };

        useEffect(() => {
            const finalNumberWeight = Number(inWeight) + Number(product.weight);
            setFinalWeight(finalNumberWeight);
            const finalNumberQuantity = Number(inQuantity) + Number(product.quantity);
            setFinalQuantity(finalNumberQuantity);
            setQuantity(finalQuantity)
            setWeight(finalWeight)
        }, [inWeight, inQuantity, finalQuantity, finalWeight]);


        return (
            <div className='grid grid-cols-2 gap-2 my-2 p-2'>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Weight"
                        variant="outlined"
                        name='weight'
                        value={inWeight}
                        onChange={handleWeightChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        name='quantity'
                        value={inQuantity}

                    />
                </div>
                <div className='flex flex-col'>
                    <div>
                        Final Weight:- {finalWeight}
                    </div>
                    <div>
                        Final Quantity:- {finalQuantity}
                    </div>
                </div>
            </div >
        );
    }
    function StockOutCementForm() {
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
            setQuantity(finalQuantity)
            setWeight(finalWeight)
        }, [finalQuantity, finalWeight, outQuantity, outWeight]);

        return (
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
                <div className='flex flex-col'>
                    <div>
                        Final Weight:- {finalWeight}
                    </div>
                    <div>
                        Final Quantity:- {finalQuantity}
                    </div>
                </div>
            </div>
        );
    }
    function StockInIronForm() {
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
            setWeight(finalCalculatedweight)
        }, [inWeight, finalCalculatedweight])
        return (
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
                <div>
                    Final Value:- {finalCalculatedweight}
                </div>
            </div >
        );
    }
    function StockOutIronForm() {
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
            setWeight(finalCalculatedweight)
        }, [inWeight, finalCalculatedweight])
        return (
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
                <div>
                    Final Value:- {finalCalculatedweight}
                </div>
            </div >
        );
    }
    function StockInGitiForm() {
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
            setCft(finalCalculatedCft)
        }, [inCft, finalCalculatedCft])
        return (
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
                <div>
                    Final Value:- {finalCalculatedCft}
                </div>
            </div >
        );
    }
    function StockOutGitiForm() {
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
            setCft(finalCalculatedCft)
        }, [outCft, finalCalculatedCft])
        return (
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
                </div>
                <div>
                    Final Value:- {finalCalculatedCft}
                </div>
            </div >
        );
    }

    return (
        <div className='flex items-center justify-around border my-4'>
            <FormControl>
                <div className='text-center font-[montserrat] text-xl my-2 text-red-600'>
                    Select Action
                </div>
                <div className='flex justify-center items-center'>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedValue}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="stockIn" control={<Radio />} label={<StockIn selected={selectedValue === 'stockIn'} />} />
                        <FormControlLabel value="stockOut" control={<Radio />} label={<StockOut selected={selectedValue === 'stockOut'} />} />
                    </RadioGroup>
                </div>

                {product.category === "Cement" && selectedValue === "stockIn" ? <StockInCementForm /> : null}
                {product.category === "Cement" && selectedValue === "stockOut" ? <StockOutCementForm /> : null}
                {product.category === "Iron" && selectedValue === "stockIn" ? <StockInIronForm /> : null}
                {product.category === "Iron" && selectedValue === "stockOut" ? <StockOutIronForm /> : null}
                {product.category === "3/4" || product.category === "5/8" && selectedValue === "stockIn" ? <StockInGitiForm /> : null}
                {product.category === "3/4" || product.category === "5/8" && selectedValue === "stockOut" ? <StockOutGitiForm /> : null}
                {selectedValue ?
                    <div className="w-full flex justify-center items-center mb-2 px-2">
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

                            >
                                Update
                            </span>
                        </button>
                    </div> : null}
            </FormControl >
        </div >
    );
} InventoryUpdateForm.propTypes = {
    product: PropTypes.shape({
        category: PropTypes.string,
        weight: PropTypes.number,
        quantity: PropTypes.number,
        cft: PropTypes.number,
    }).isRequired,
};