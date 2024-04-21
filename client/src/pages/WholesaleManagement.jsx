import AddWholeSale from '../components/AddWholeSale'
import Dashboard from '../components/Dashboard'
import WholeSaleCard from '../components/WholeSaleCard'
import { useSelector } from 'react-redux'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
// import DialogCard from '../components/DialogCard';
import WholeSaleDialogCard from '../components/WholeSaleDialogCard';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import WholeSaleUpdateForm from '../components/WholeSaleUpdateFrom';
import Paper from '@mui/material/Paper';

// import wholesaleSlice from '../app/wholesale/wholesaleSlice';



export default function WholesaleManagement() {
    const wholesale = useSelector(state => state.wholesale.wholesale)
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);

    const [clientName, setClientName] = useState('');
    const [category, setCategory] = useState('');

    const handleClientNameChange = (event) => {
        setClientName(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleClickOpen = (item) => {
        setOpen(true);
        setSelectedItem(item);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleWholeSaleUpdateSuccess = () => {
        handleClose();
        handleSnackClick();
    };

    const handleSnackClick = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };

    const cementItems = wholesale.filter(item => item.category === "Cement");
    const ironItems = wholesale.filter(item => item.category === "Iron");
    const gitiItems = wholesale.filter(item => item.category === "3/4" || item.category === "5/8");
    const chemicalItems = wholesale.filter(item => item.category === "Chemicals");

    return (
        <div>

            <Dashboard>
                <div>
                    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert
                            onClose={handleSnackClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Inventory Product Updated
                        </Alert>
                    </Snackbar>
                </div>
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
                            <WholeSaleDialogCard
                                productName={selectedItem?.name}
                                brand={selectedItem?.brand}
                                clientName={selectedItem?.clientName}
                                // clientName='Guriya'
                                weight={selectedItem?.weight}
                                quantity={selectedItem?.quantity}
                                cft={selectedItem?.cft}
                                category={selectedItem?.category}
                            />
                            <WholeSaleUpdateForm
                                product={selectedItem}
                                onSuccess={handleWholeSaleUpdateSuccess}
                                handleClose={handleClose}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Paper elevation={3} className='p-3 my-2'>
                    <div className='my-2'>
                        <FilterAltIcon />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-col'>
                            <label className='my-1'>Name</label>
                            <input placeholder='Client Name' name='clientName' className='border border-black p-2 w-72' onChange={handleClientNameChange} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='my-1'>Category</label>
                            <input placeholder='Category' name='category' className='border border-black p-2 w-72' onChange={handleCategoryChange} />
                        </div>
                    </div>
                </Paper>
                {/* <Paper elevation={3} className='px-3 my-2'> */}
                {wholesale.length > 0 ? (
                    <div>
                        <div className='grid md:grid-cols-5 gap-4 items-center justify-center'>
                            {wholesale.filter(item => item.clientName.toLowerCase().includes(clientName.toLowerCase()) && item.category.toLowerCase().includes(category.toLowerCase())).map((item, index) => (
                                <WholeSaleCard
                                    key={index}
                                    productname={item.name}
                                    brand={item.brand}
                                    weight={item.weight}
                                    clientName={item.clientName}
                                    quantity={item.quantity}
                                    cft={item.cft}
                                    category={item.category}
                                    handleClick={() => handleClickOpen(item)}
                                />
                            ))}
                        </div>
                    </div>
                ) : "Nothing Added"}
                {/* </Paper> */}
                {/* <Paper elevation={3} className='px-3 my-2'> */}

                {/* </Paper> */}
                <div className='fixed bottom-0 right-0 mb-10 mr-10'>
                    <AddWholeSale />
                </div>
            </Dashboard>
        </div>
    )
}
