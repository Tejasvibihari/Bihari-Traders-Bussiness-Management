import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddInventory() {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Tooltip title="Add Product">
                <IconButton onClick={handleClickOpen}>
                    <AddCircleRoundedIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Product To Inventory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="productName"
                            name="productName"
                            label="Product Name"
                            type="text"
                            fullWidth
                            sx={{ width: '50%' }}
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="hsnCode"
                            name="hsnCode"
                            label="HSN Code"
                            type="text"
                            fullWidth
                            sx={{ width: '50%' }}
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="productCategory"
                            name="productCategory"
                            label="Product Category"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="productPrice"
                            name="productPrice"
                            label="Product Price"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="productWeight"
                            name="productWeight"
                            label="Product Weight"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="productQuantity"
                            name="productQuantity"
                            label="Product Quantity"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="productImage"
                            name="productImage"
                            label="Product Image"
                            type="text"
                            fullWidth
                            variant="standard"
                        />

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
