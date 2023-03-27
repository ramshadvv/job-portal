import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../context/AuthContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AddPic() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();
    const {authToken, fetchUserDetails} = React.useContext(AuthContext)

    const createMyModelEntry = async (data) => {
        let form_data = new FormData();
        if (data.image)
            form_data.append("image", data.image[0], data.image.name);
        return form_data
    };

    const onSubmit = async (data)=> {
          let form_data = await createMyModelEntry(data)
          console.log(form_data)
            try {
                await axios.post(BaseUrl + '/addpic/', form_data,{
                headers:{
                    "Authorization" : `Bearer ${authToken}`,
                    'Content-Type' :'multipart/form-data', 
                }
                }).then(async (response) => {
                    console.log(response.data)
                    fetchUserDetails(authToken)
                    navigate('/profile')
                });
            } catch (error) {
                console.log(error);
               
                Swal.fire("Error", "Something went wrong");
            }
    };

    

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile Pic
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mt: 7}}>
                <TextField
                    {...register("image", {
                        required: "Image is required",
                    })}
                    required
                    fullWidth
                    focused
                    id="image"
                    label="Profile Picture"
                    name="image"
                    type="file"
                    autoComplete="image"
                    error={!!errors.image}
                    helperText={errors.image ? errors.image.message : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 7, mb: 2, padding:'5px 2rem', ml:15 }}
            >
              add
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}