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
import { useSelector, useDispatch } from 'react-redux';
import { addInventoryError, addInventoryStart, addInventorySuccess } from '../app/inventory/inventorySlice';





export default function AddWholeSale() {
    const user = useSelector(state => state.user)
    const inventory = useSelector(state => state.inventory)
    const dispatch = useDispatch()
    // SnackBar State 
    const [snackBar, setSnackBar] = useState(false);
    // Inventory State 
    const [wholeSaleopen, setWholeSaleOpen] = useState(false);
    //Speed Dial State 
    const [speedDialopen, setSpeedDialOpen] = useState(false);
    //Brand Form Open Close State
    // const [Brandopen, setBrandOpen] = useState(false);
    const [brandMsg, setBrandMsg] = useState("");
    // Brand Form State
    // const [brandName, setBrandName] = useState("");
    // const [brandCategory, setBrandCategory] = useState("");
    //Inventory Form State data from Database
    const [formBrand, setFormBrand] = useState([]);
    // Inventory Form State
    const [name, setName] = useState("");
    const [clientName, setClientName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cft, setCft] = useState("");
    const [userId, setUserId] = useState("");
    const [inventoryMsg, setInventoryMsg] = useState("");




    const handleSnackBarOpen = () => {
        setSnackBar(true);
        setName("");
        setClientName("");
        setCategory("");
        setBrand("");
        setWeight("");
        setCft("");
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
    const handleWholeSaleOpen = () => {
        setWholeSaleOpen(true);
    };
    const handleWholeSaleClose = () => {
        setWholeSaleOpen(false);
    };

    // Inventory Form Handling
    const handlewholeSaleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(addInventoryStart())
            const inventoryFormData = {
                name: name,
                clientName: clientName,
                category: category,
                brand: brand,
                weight: weight,
                quantity: quantity,
                cft: cft,
                userId: userId
            }
            const inventoryData = await axios.post("/api/inventory/addinventory", inventoryFormData);
            setInventoryMsg(inventoryData.data.message)
            handleWholeSaleClose()
            handleSnackBarOpen()
            console.log(inventoryData.data)
            dispatch(addInventorySuccess(inventoryData.data.newInventory))
        } catch (error) {
            console.log(error)
            dispatch(addInventoryError(error.response.data.message))
        }
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



    const WEIGHT_CONSTANT = 50; // Replace with a meaningful name and value
    useEffect(() => {
        const calculateQuantity = () => {
            if (category === "Cement") {
                const quantity = weight / WEIGHT_CONSTANT;
                setQuantity(quantity);
            } else {
                setQuantity("");
            }
        };

        if (weight) {
            calculateQuantity();
        }
        setUserId(user.currentUser._id)
    }, [category, brandMsg, formBrand, weight, user.currentUser._id]);

    return (
        <div>
            {/* Notification Component  */}
            <Snackbar
                className='mt-12'
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
                    {brandMsg === "Brand Created Successfully" ? brandMsg : (inventoryMsg === "Product Added to Inventory successfully" ? inventoryMsg : null)}
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
                        icon={<PlaylistAddCircleIcon />}
                        tooltipTitle="Wholesale"
                        tooltipOpen
                        onClick={handleWholeSaleOpen}
                    />
                </SpeedDial>
            </Box>
            <Dialog
                open={wholeSaleopen}
                onClose={handleWholeSaleClose}
            >
                <DialogTitle>Add Product To Inventory</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Box component="form" onSubmit={handlewholeSaleSubmit} noValidate sx={{ mt: 3 }}>
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
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="clientname"
                                    label="Client Name"
                                    name="clientname"
                                    onChange={(event) => setClientName(event.target.value)}
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
                                    placeholder='Category'
                                    onBlur={getBrand}
                                    onChange={(event) => setCategory(event.target.value)}
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
                                    onChange={(event) => setBrand(event.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {formBrand.map((brand, i) => <MenuItem key={i} value={brand.brandName}>{brand.brandName}</MenuItem>)}
                                </Select>
                            </Grid>
                            {category === "Cement" && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="weight"
                                            label="Weight in (Kg)"
                                            name="weight"
                                            onChange={(event) => setWeight(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="quantity"
                                            label="Quantity"
                                            type="text"
                                            id="quantity"
                                            autoComplete="Quantity"
                                            value={quantity}
                                        />
                                    </Grid>
                                </>
                            )}
                            {category === "5/8" || category === "3/4" ? (
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="cft"
                                        label="CFT"
                                        name="cft"
                                        onChange={(event) => setCft(event.target.value)}
                                    />
                                </Grid>
                            ) : null}
                            {category === "Iron" && (
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="weight"
                                        label="Weight in (Kg)"
                                        name="weight"
                                        onChange={(event) => setWeight(event.target.value)}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        {/* Create product button */}
                        <div className="mt-3 w-full flex justify-center items-center">
                            <button className=" w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
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
                                    {inventory.loading ? "Creating Product..." : "Create Product"}
                                </span>
                            </button>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWholeSaleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            {/* Whole Sale  Form Ended */}

        </div >
    )
}
