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
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





export default function AddInventory() {
    // SnackBar State 
    const [snackBar, setSnackBar] = useState(false);
    // Inventory State 
    const [Inventoryopen, setInventoryOpen] = useState(false);
    //Speed Dial State 
    const [speedDialopen, setSpeedDialOpen] = useState(false);
    //Brand Form Open Close State
    const [Brandopen, setBrandOpen] = useState(false);
    const [brandMsg, setBrandMsg] = useState("");
    // Brand Form State
    const [brandName, setBrandName] = useState("");
    const [brandCategory, setBrandCategory] = useState("");
    //Inventory Form State
    const [formBrand, setFormBrand] = useState([]);


    const handleSnackBarOpen = () => {
        setSnackBar(true);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar(false);
        setBrandMsg("");
    };

    // Speed Dial  Open Close
    const handleSpeedDialOpen = () => setSpeedDialOpen(true);
    const handleSpeedDialClose = () => setSpeedDialOpen(false);
    // Inventory Form Open Close 
    const handleInventoryOpen = () => {
        setInventoryOpen(true);
    };
    const handleInventoryClose = () => {
        setInventoryOpen(false);
    };
    // Brand Form Open Close 
    const handleBrandOpen = () => {
        setBrandOpen(true);
    };
    const handleBrandFormClose = () => {
        setBrandOpen(false);
    };
    // Inventory Form State
    const [productName, setProductName] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, seQuantity] = useState("");
    //Brand Form Handlling 
    const handleBrandChange = (event) => {
        setBrandName((event.target.value).charAt(0).toUpperCase() + event.target.value.slice(1));
    }
    const handleBrandCategoryChange = (event) => {
        setBrandCategory(event.target.value);
    }
    const handleBrandSubmit = async (event) => {
        event.preventDefault();
        try {
            const brandFormData = { brandName: brandName, brandCategory: brandCategory }
            const brandData = await axios.post("/api/inventory/brand/createbrand", brandFormData);
            setBrandMsg(brandData.data.message)
            handleBrandFormClose()
            handleSnackBarOpen()
        } catch (error) {
            console.log(error)
        }
    }


    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const getBrand = async () => {
        try {
            const categoryReq = { category: category }
            const brands = await axios.post("/api/inventory/brand/getbrand", categoryReq);
            console.log(brands)
            setFormBrand(brands.data)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        console.log(category)
        console.log(brandName);
        console.log(brandCategory);
        console.log(brandMsg)
        console.log(formBrand)
    }, [category, brandName, brandCategory, brandMsg, formBrand])
    return (
        <div>
            {/* Notification Component  */}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackBar}
                onClose={handleSnackBarClose}


            >
                <Alert
                    onClose={handleSnackBarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {brandMsg === "Brand Created Successfully" ? brandMsg : null}
                </Alert>
            </Snackbar>

            <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleSpeedDialClose}
                    onOpen={handleSpeedDialOpen}
                    open={speedDialopen}
                >
                    <SpeedDialAction
                        icon={<DomainAddIcon />}
                        tooltipTitle="Add Brand"
                        tooltipOpen
                        onClick={handleBrandOpen}
                    />
                    <SpeedDialAction
                        icon={<PlaylistAddCircleIcon />}
                        tooltipTitle="Add Product"
                        tooltipOpen
                        onClick={handleInventoryOpen}
                    />
                </SpeedDial>
            </Box>
            <Dialog
                open={Inventoryopen}
                onClose={handleInventoryClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleInventoryClose();
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
                                    onBlur={getBrand}
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
                                    {formBrand.map((brand, i) => <MenuItem key={i} value={brand.brandName}>{brand.brandName}</MenuItem>)}
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
                    <Button onClick={handleInventoryClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
            {/* Inventory Add Form Ended */}
            {/* Brand Add Form  */}
            <Dialog
                open={Brandopen}
                onClose={handleBrandFormClose}
                PaperProps={{
                    // component: 'form',
                    // onSubmit: (event) => {
                    // event.preventDefault();
                    // const formData = new FormData(event.currentTarget);
                    // const formJson = Object.fromEntries(formData.entries());
                    // const email = formJson.email;
                    // console.log(email);
                    // handleBrandClose();
                    // },
                }}
            >
                <DialogTitle className='text-center'>Add Brand To Inventory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add Name of the Brand to the Inventory id not exists
                    </DialogContentText>
                    <Box component="form" onSubmit={handleBrandSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="Brand Name"
                                    name="brandName"
                                    required
                                    fullWidth
                                    id="brandName"
                                    label="Brand Name"
                                    autoFocus
                                    onChange={handleBrandChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    fullWidth
                                    label="Category"
                                    name="brandCategory"
                                    onChange={handleBrandCategoryChange}
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Brand
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBrandFormClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}
