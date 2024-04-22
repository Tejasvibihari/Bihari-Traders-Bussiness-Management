import React, { useState, useEffect, useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StockInCementForm, StockOutCementForm, StockInIronForm, StockOutIronForm, StockInGitiForm, StockOutGitiForm } from './StockUpdateForm';
import client from '../service/axiosClient';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateInventory } from '../app/inventory/inventorySlice';


export default function InventoryUpdateForm({ product, ...props }) {
    const [selectedValue, setSelectedValue] = useState('');

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            id: formData.get('id'),
            weight: formData.get('weight'),
            quantity: formData.get('quantity'),
            cft: formData.get('cft'),
        };
        try {
            const response = await client.post('/api/inventory/updateinventory', data);
            dispatch(updateInventory(response.data.data));

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

    const stockInCementForm = useMemo(() => {
        if (product.category === "Cement" && selectedValue === "stockIn") {
            return <StockInCementForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockOutCementForm = useMemo(() => {
        if (product.category === "Cement" && selectedValue === "stockOut") {
            return <StockOutCementForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockInIronForm = useMemo(() => {
        if (product.category === "Iron" && selectedValue === "stockIn") {
            return <StockInIronForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockOutIronForm = useMemo(() => {
        if (product.category === "Iron" && selectedValue === "stockOut") {
            return <StockOutIronForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockInGitiForm = useMemo(() => {
        if ((product.category === "3/4" || product.category === "5/8") && selectedValue === "stockIn") {
            return <StockInGitiForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);

    const stockOutGitiForm = useMemo(() => {
        if ((product.category === "3/4" || product.category === "5/8") && selectedValue === "stockOut") {
            return <StockOutGitiForm product={product} onSubmit={handleSubmit} />;
        }
    }, [selectedValue, product]);



    return (
        <>
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

                    {stockInCementForm}
                    {stockOutCementForm}
                    {stockInIronForm}
                    {stockOutIronForm}
                    {stockInGitiForm}
                    {stockOutGitiForm}

                </FormControl>
            </div>
        </>
    );
}

InventoryUpdateForm.propTypes = {
    product: PropTypes.shape({
        category: PropTypes.string,
        weight: PropTypes.number,
        quantity: PropTypes.number,
        cft: PropTypes.number,
    }),
};
