<<<<<<< HEAD
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



=======

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
>>>>>>> 314a650aaf79df10796b035a7da90f858b9f9686

export default function SignUpForm() {

    return (
        <>

            <div className='flex mx-auto justify-center items-center max-w-lg py-16'>
                <form>

                    <Typography component="h1" variant="h4" align="center" color="black" marginTop="4" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField  id="name" label="Name" variant="filled" fullWidth margin="normal" required />
                    <TextField  id="businessName" label="Business Name" variant="filled" fullWidth margin="normal" required />
                    <TextField  id="password" label="Password" variant="filled" fullWidth margin="normal" required type="password" />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                </form>
            </div>

        </>
    )
}
