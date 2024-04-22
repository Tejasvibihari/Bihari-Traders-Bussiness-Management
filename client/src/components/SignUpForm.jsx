import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../app/user/userSlice';

export default function SignUpForm() {
    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);


    const [snackOpen, setSnackOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bussinessName, setBusinessName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gstin, setGstin] = useState('');

    const dispatch = useDispatch();

    // Snack Open Close
    const handleSnackOpen = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { name, email, password, bussinessName, mobile, address, gstin };
        try {
            dispatch(signUpStart())
            const response = await axios.post('https://bihari-traders-api.vercel.app/api/user/signup', formData);
            dispatch(signUpSuccess(response.data))
            handleSnackOpen()
        } catch (error) {
            dispatch(signUpFailure(error.response.data.message))
            handleSnackOpen()

        }
    }
    https://bihari-traders-api.vercel.app
    return (
        <>
            <div>
                <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                    {error ? (
                        <Alert
                            onClose={handleSnackClose}
                            severity="error"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {error}
                        </Alert>
                    ) : (
                        <Alert
                            onClose={handleSnackClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            User Created
                        </Alert>
                    )}
                </Snackbar>
            </div>

            <div className='flex mx-auto justify-center items-center max-w-lg pt-16'>
                <form onSubmit={handleSubmit}>
                    <Typography component="h1" variant="h4" align="center" color="black" marginTop="4" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name" variant="filled" fullWidth margin="normal" required value={name} onChange={e => setName(e.target.value)} />
                    <TextField id="email" label="Email" variant="filled" fullWidth margin="normal" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField id="mobile" label="Mobile" variant="filled" fullWidth margin="normal" required type="number" value={mobile} onChange={e => setMobile(e.target.value)} />

                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <TextField id="businessName" label="Business Name" variant="filled" fullWidth margin="normal" required value={bussinessName} onChange={e => setBusinessName(e.target.value)} />
                        </div>
                        <div>
                            <TextField id="gstin" label="GSTIN" variant="filled" fullWidth margin="normal" required value={gstin} onChange={e => setGstin(e.target.value)} />
                        </div>
                    </div>
                    <TextField id="address" label="Address" variant="filled" fullWidth margin="normal" required value={address} onChange={e => setAddress(e.target.value)} />

                    <TextField id="password" label="Password" variant="filled" fullWidth margin="normal" required type="password" value={password} onChange={e => setPassword(e.target.value)} />



                    {/* Sign up Button */}
                    <div className="mt-2 w-full flex justify-center items-center ">
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
                                {loading ? 'Please Wait...' : 'Sign Up'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}