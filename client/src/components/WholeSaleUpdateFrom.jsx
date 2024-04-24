import React, { useState, useEffect, useMemo } from 'react';
import FormControl from '@mui/material/FormControl';
import { StockOutCementForm, StockOutIronForm, StockOutGitiForm } from './WholeSaleStockUpdateFrom';
import client from '../service/axiosClient';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addWholesaleStart, updateWholesale } from '../app/wholesale/wholesaleSlice';


export default function WholeSaleUpdateForm({ product, ...props }) {
    const [selectedValue, setSelectedValue] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addWholesaleStart())
        const formData = new FormData(e.target);
        const data = {
            id: formData.get('id'),
            weight: formData.get('weight'),
            quantity: formData.get('quantity'),
            cft: formData.get('cft'),
        };
        try {
            const response = await client.post('/api/inventory/wholesale/updatewholesale', data);
            dispatch(updateWholesale(response.data.data));

            if (props.onSuccess) {
                props.onSuccess();
            }
            if (props.handleClose) {
                props.handleClose();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    function StockIn({ selected }) {
        return (
            <div className={`border py-1 px-3 font-[montserrat] rounded-md ${selected ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-red-600'}`}>
                Stock In
            </div>
        );
    }

    function StockOut({ selected }) {
        return (
            <div className={`border py-1 px-3 font-[montserrat] rounded-md ${selected ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-red-600'}`}>
                Stock Out
            </div>
        );
    }

    const stockOutCementForm = useMemo(() => {
        if (product.category === "Cement") {
            return <StockOutCementForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockOutIronForm = useMemo(() => {
        if (product.category === "Iron") {
            return <StockOutIronForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);


    const stockOutGitiForm = useMemo(() => {
        if (product.category === "3/4" || product.category === "5/8") {
            return <StockOutGitiForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);



    return (
        <>
            <div className='flex items-center justify-around border my-4'>
                <FormControl>
                    <div className='flex flex-col justify-center items-center text-center font-[montserrat] text-xl my-2 text-red-600 p-3 '>
                        <div className='px-3 mb-4 font-[montserrat] cursor-pointer'>
                            Select Action
                        </div>
                        <div className='border px-5 bg-green-500 font-[montserrat] text-black rounded-md mb-3  cursor-pointer '>
                            Stock send
                        </div>
                    </div>
                    {/* <div className='flex justify-center items-center'>
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
                    </div> */}




                    {stockOutCementForm}

                    {stockOutIronForm}
                    {stockOutGitiForm}

                </FormControl>
            </div>
        </>
    );
}

WholeSaleUpdateForm.propTypes = {
    product: PropTypes.shape({
        category: PropTypes.string,
        weight: PropTypes.number,
        quantity: PropTypes.number,
        cft: PropTypes.number,
    }),
};
