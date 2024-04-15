
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LoginForm() {

    return (
        <>

            <div className='flex mx-auto justify-center items-center max-w-lg lg:py-20 py-12'>
                <form>

                    <Typography component="h1" variant="h4" align="center" color="black" margin="" gutterBottom>
                        Sign In
                    </Typography>
                    <TextField  id="email" label="Email" variant="filled" fullWidth margin="normal" required />
                    <TextField  id="password" label="Password" variant="filled" fullWidth margin="normal" required type="password" />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        LogIn
                    </Button>


                </form>
            </div>

        </>
    )
}
