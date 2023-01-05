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
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

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

function CompanyVerify() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();

  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    form_data.append("company_id", data.company_id);

    return form_data
  };
    const onSubmit = async (data)=> {
          let form_data = await createMyModelEntry(data)
          console.log(form_data)
            try {
                await axios.post(BaseUrl + '/checkcompany/', form_data,{
                headers:{
                    'Content-Type' :'multipart/form-data', 
                }
                }).then(async (response) => {
                    navigate(`/staff/signup/${response.data.id}`)
                });
            } catch (error) {
                console.log(error);
                Swal.fire("Error", "Company is Not Registered");
            }
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight:'60vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    {...register("company_id", {
                        required: "Company id is required",
                        pattern: {
                          value: /^[a-zA-Z0-9]{10,10}$/,
                          message:
                            "Must be valid company id number",
                        },
                    })}
                    required
                    fullWidth
                    id="company_id"
                    label="Company ID"
                    name="company_id"
                    autoComplete="family-name"
                    error={!!errors.company_id}
                    helperText={errors.company_id ? errors.company_id.message : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default CompanyVerify;
