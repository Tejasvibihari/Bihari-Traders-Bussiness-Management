import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';



export default function SignUpForm() {
    const outerTheme = useTheme();
    return (
        <>

            <div className='flex mx-auto justify-center items-center max-w-lg py-12'>
                <form>

                    <Typography component="h1" variant="h5" align="center" color="white" margin="" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField color='' id="name" label="Name" variant="filled" fullWidth margin="normal" required />
                    <TextField id="businessName" label="Business Name" variant="filled" fullWidth margin="normal" required />
                    <TextField id="email" label="Email" variant="filled" fullWidth margin="normal" required />
                    <TextField id="password" label="Password" variant="filled" fullWidth margin="normal" required type="password" />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>


                </form>
            </div>

        </>
    )
}
