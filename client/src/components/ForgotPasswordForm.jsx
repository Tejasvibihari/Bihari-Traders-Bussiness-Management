
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function ForgotPasswordForm() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

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
        try {
            setLoading(true)
            const formData = { email };
            const response = await axios.post('/api/user/forgotpassword', formData);
            console.log(response.data)
            navigate("/resetpassword")
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message);
            handleSnackOpen()
        }
    }


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
                    ) : null}
                </Snackbar>
            </div>
            <div className='flex mx-auto justify-center items-center max-w-lg lg:pt-20 pb-4 pt-12 font-[montserrat] '>
                <form onSubmit={handleSubmit} className='font-[montserrat]'>
                    <Typography component="h1" variant="h4" align="center" color="black" margin="" gutterBottom>
                        Forget Password
                    </Typography>
                    <TextField id="email" onChange={e => setEmail(e.target.value)} value={email} label="Email" variant="filled" className='w-96' margin="normal" required />
                    {/* Sign In Button */}
                    <div className="mt-2 w-full flex justify-center items-center">
                        <button className="w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff006e_0%,#ffbe0b_50%,#8338ec_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg, #e63946,40%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                {loading ? "Please Wait Sending Email..." : "Reset Your Password"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
