import AddInventory from '../components/AddInventory'
import Dashboard from '../components/Dashboard'
import InventoryCard from '../components/InventoryCard'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import DialogCard from '../components/DialogCard';
import InventoryUpdateForm from '../components/InventoryUpdateForm';
export default function Inventory() {
    const inventory = useSelector(state => state.inventory.inventory)
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClickOpen = (item) => {
        setOpen(true);
        setSelectedItem(item);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchInventory = async () => {
        try {
            console.log("hello")
        } catch (error) {
            console.log(error)
        }
    }

    const cementItems = inventory.filter(item => item.category === "Cement");
    const ironItems = inventory.filter(item => item.category === "Iron");
    const gitiItems = inventory.filter(item => item.category === "3/4" || item.category === "5/8");
    const chemicalItems = inventory.filter(item => item.category === "Chemicals");

    return (
        <div>
            <Dashboard>
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Update The Stock
                            </DialogContentText>
                            <DialogCard
                                productName={selectedItem?.name}
                                brand={selectedItem?.brand}
                                weight={selectedItem?.weight}
                                quantity={selectedItem?.quantity}
                                cft={selectedItem?.cft}
                                category={selectedItem?.category}
                            />
                            <InventoryUpdateForm
                                product={selectedItem}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Paper elevation={3} className='px-3 my-2'>
                    {cementItems.length > 0 ? (
                        <div>
                            <div className='pt-4 text-xl font-[montserrat] text-red-600'>
                                Cement
                            </div>
                            <div className='grid md:grid-cols-5 items-center justify-center'>
                                {cementItems.map((item, index) => (
                                    <InventoryCard
                                        key={index}
                                        productname={item.name}
                                        brand={item.brand}
                                        weight={item.weight}
                                        quantity={item.quantity}
                                        cft={item.cft}
                                        category={item.category}
                                        handleClick={() => handleClickOpen(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </Paper>
                <Paper elevation={3} className='px-3 my-2'>
                    {ironItems.length > 0 ? (
                        <div>
                            <div className='pt-4 text-xl font-[montserrat] text-red-600'>
                                Iron
                            </div>
                            <div className='grid md:grid-cols-5 items-center justify-center'>
                                {inventory.filter(item => item.category === "Iron").map((item, index) => {
                                    return <InventoryCard
                                        key={index}
                                        productname={item.name}
                                        brand={item.brand}
                                        weight={item.weight}
                                        quantity={item.quantity}
                                        cft={item.cft}
                                        category={item.category}
                                        handleClick={() => handleClickOpen(item)}
                                    />
                                })}
                            </div>
                        </div>
                    ) : null}
                </Paper>
                <Paper elevation={3} className='px-3 my-2'>
                    {gitiItems.length > 0 ? (
                        <div>
                            <div className='pt-4 text-xl font-[montserrat] text-red-600'>
                                Giti
                            </div>
                            <div className='grid md:grid-cols-5 items-center justify-center'>
                                {inventory.filter(item => item.category === "3/4" || item.category === "5/8").map((item, index) => {
                                    return <InventoryCard
                                        key={index}
                                        productname={item.name}
                                        brand={item.brand}
                                        weight={item.weight}
                                        quantity={item.quantity}
                                        cft={item.cft}
                                        category={item.category}
                                        handleClick={() => handleClickOpen(item)}
                                    />
                                })}
                            </div>
                        </div>) : null}
                </Paper>
                <Paper elevation={3} className='px-3 my-2'>
                    {chemicalItems.length > 0 ? (
                        <div>
                            <div className='pt-4 text-xl font-[montserrat] text-red-600'>
                                Chemicals
                            </div>
                            <div className='grid md:grid-cols-5 items-center justify-center'>
                                {inventory.filter(item => item.category === "Chemicals").map((item, index) => {
                                    return <InventoryCard
                                        key={index}
                                        productname={item.name}
                                        brand={item.brand}
                                        weight={item.weight}
                                        quantity={item.quantity}
                                        cft={item.cft}
                                        category={item.category}
                                        handleClick={() => handleClickOpen(item)}
                                    />
                                })}
                            </div>
                        </div>) : null}
                </Paper>
                <div className='absolute bottom-0 right-0 mb-10 mr-10'>
                    <AddInventory />
                </div>
            </Dashboard>
        </div>
    )
}
