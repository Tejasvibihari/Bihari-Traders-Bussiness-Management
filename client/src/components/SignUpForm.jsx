import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TextField from '@mui/material/TextField';


export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bussinessName, setBusinessName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { name, email, password, bussinessName };
        try {
            const response = await axios.post('/api/user/signup', formData);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex mx-auto justify-center items-center max-w-lg pt-16'>
            <form onSubmit={handleSubmit}>
                <Typography component="h1" variant="h4" align="center" color="black" marginTop="4" gutterBottom>
                    Sign Up
                </Typography>
                <TextField id="name" label="Name" variant="filled" fullWidth margin="normal" required value={name} onChange={e => setName(e.target.value)} />
                <TextField id="email" label="Email" variant="filled" fullWidth margin="normal" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField id="password" label="Password" variant="filled" fullWidth margin="normal" required type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField id="businessName" label="Business Name" variant="filled" fullWidth margin="normal" required value={bussinessName} onChange={e => setBusinessName(e.target.value)} />
                {/* Sign up Button */}
                <div className="mt-2 w-full flex justify-center items-center ">
                    <button className=" w-full relative inline-flex h-12 overflow-hidden p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
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
                            Sing Up
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}