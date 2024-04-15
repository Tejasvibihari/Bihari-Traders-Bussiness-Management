
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
            <div className='flex mx-auto justify-center items-center max-w-lg lg:py-20 py-12'>
                <form onSubmit={handleSubmit}>
                    <Typography component="h1" variant="h4" align="center" color="black" margin="" gutterBottom>
                        Sign In
                    </Typography>
                    <TextField id="email" onChange={e => setEmail(e.target.value)} value={email} label="Email" variant="filled" fullWidth margin="normal" required />
                    <TextField id="password" onChange={e => setPassword(e.target.value)} value={password} label="Password" variant="filled" fullWidth margin="normal" required type="password" />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        LogIn
                    </Button>
                </form>
            </div>

        </>
    )
}
