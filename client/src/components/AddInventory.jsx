import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export default function AddInventory() {

    const [open, setOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, seQuantity] = useState("");

    const cementBrand = ["Ultratech", "Ambuja", "ACC", "Birla Gold"];
    const ironBrand = ["Tata", "Sail", "Jindal", "Rathi", "Kamdhenu"];
    const stoneBrand = ["Gaya", "Kodarma", "Bhagalpur", "Munger", "Buxar"];
    const handleChange = (event) => {
        setCategory(event.target.value);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log(category)
    }, [category])
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
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="Product Name"
                                    name="productName"
                                    required
                                    fullWidth
                                    id="productName"
                                    label="Product Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="hsncode"
                                    label="HSN Code"
                                    name="hsn"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    fullWidth
                                    label="Category"
                                    name="category"
                                    onChange={handleChange}
                                    placeholder='Category'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Cement">Cement</MenuItem>
                                    <MenuItem value="Iron">Iron</MenuItem>
                                    <MenuItem value="5/8">5/8</MenuItem>
                                    <MenuItem value="3/4">3/4</MenuItem>
                                    <MenuItem value="Chemicals">Chemicals</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    fullWidth
                                    label="Brand"
                                    name="brand"

                                    placeholder='Brand'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {category === "Cement" ? cementBrand.map((brand, i) => (<MenuItem key={i} value={brand}>{brand}</MenuItem>)) : null}
                                    {category === "Iron" ? ironBrand.map((brand, i) => (<MenuItem key={i} value={brand}>{brand}</MenuItem>)) : null}
                                    {category === "5/8" || category === "3/4" ? stoneBrand.map((brand, i) => (<MenuItem key={i} value={brand}>{brand}</MenuItem>)) : null}

                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                {category === "5/8" || category === "3/4" ? <TextField
                                    required
                                    fullWidth
                                    id="cft"
                                    label="CFT"
                                    name="cft"
                                /> : <TextField
                                    required
                                    fullWidth
                                    id="weight"
                                    label="Weight in (Kg)"
                                    name="weight"
                                />}
                            </Grid>
                            <Grid item xs={6}>
                                {category === "Cement" ?
                                    <TextField
                                        required
                                        fullWidth
                                        name="quantity"
                                        label="Quantity"
                                        type="text"
                                        id="quantity"
                                        autoComplete="Quantity"
                                    /> : <TextField
                                        required
                                        fullWidth
                                        name="quantity"
                                        label="Quantity"
                                        type="text"
                                        id="quantity"
                                        disabled
                                        autoComplete="Quantity"
                                    />}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Product
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
