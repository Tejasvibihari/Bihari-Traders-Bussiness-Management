import { useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
            </form>
        </div>
    )
}