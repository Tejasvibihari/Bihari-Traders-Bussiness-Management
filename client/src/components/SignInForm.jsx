
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';

export default function SignInForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = { email, password };
            const response = await axios.post('/api/user/signin', formData);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='flex mx-auto justify-center items-center max-w-lg lg:py-20 py-12 font-[montserrat] '>
                <form onSubmit={handleSubmit} className='font-[montserrat]'>
                    <Typography component="h1" variant="h4" align="center" color="black" margin="" gutterBottom>
                        Sign In
                    </Typography>
                    <TextField id="email" onChange={e => setEmail(e.target.value)} value={email} label="Email" variant="filled" fullWidth margin="normal" required />
                    <TextField id="password" onChange={e => setPassword(e.target.value)} value={password} label="Password" variant="filled" fullWidth margin="normal" required type="password" />
                    {/* Sign In Button */}
                    <div className="mt-2 flex justify-center items-center">
                        <button className="relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fd1d1d_0%,#833ab4_50%,#fd1d1d_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center px-6 font-medium text-center  text-slate-200 transition-all backdrop-blur-3xl"
                                style={{
                                    backgroundImage: 'linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)',
                                    backgroundSize: '200% 100%',
                                    transition: 'background-position 0.5s ease',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundPosition = '-100% 0'}
                                onMouseLeave={(e) => e.target.style.backgroundPosition = '100% 0'}
                            >
                                Sing In
                            </span>
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
