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

import {useState} from 'react';
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

export default function OwnerSignUp() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name:"",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        image: "",
        password: "",
        password2: "",
        status:"owner",
  });

  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    if (data.image)
      form_data.append("image", data.image, data.image.name);
    form_data.append("first_name", data.first_name);
    form_data.append("last_name", data.last_name);
    form_data.append("email", data.email);
    form_data.append("phone", data.phone);
    form_data.append("username", data.username);
    form_data.append("password", data.password);
    form_data.append("password2", data.password2);
    form_data.append("status", data.status);

    return form_data
  };
  
  const handleChange= (e) => {
      setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    console.log(userData)
  };

  const handleImageChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0],
    });
  };
    
    const onSubmit = async ()=> {
        if(userData.password !== userData.password2){
            Swal.fire("Error", "Password must be same!!");
        }else{
          let form_data = await createMyModelEntry(userData)
          console.log(form_data)
            try {
                await axios.post(BaseUrl + '/register/', form_data,{
                headers:{
                    'Content-Type' :'multipart/form-data', 
                }
                }).then(async (response) => {
                    navigate('/owner')
                });
            } catch (error) {
                console.log(error);
               
                Swal.fire("Error", "Something went wrong");
            }

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("first_name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]{3,}$/,
                          message:
                            "Must be Characters & should not be less than 3",
                        },
                    })}
                    onChange={handleChange}
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    error={!!errors.first_name}
                    helperText={errors.first_name ? errors.first_name.message : ''}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("last_name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]{1,}$/,
                          message:
                            "Must be Characters & should not be less than 3",
                        },
                    })}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                    error={!!errors.last_name}
                    helperText={errors.last_name ? errors.last_name.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("username", {
                        required: "Username is required",
                        pattern: {
                          value: /^[A-Za-z0-9\s]{3,}$/,
                          message:
                            "Must be Characters & should not be less than 3",
                        },
                    })}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="family-name"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message:
                            "Please enter valid email",
                        },
                    })}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]{10,}$/,
                          message:
                            "Must be valid phone number",
                        },
                    })}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("image", {
                        required: "Image is required",
                    })}
                    onChange={handleImageChange}
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
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("password", {
                        required: "Password is required",
                        // pattern: {
                        //   value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
                        //   message:
                        //     "Must be valid password",
                        // },
                    })}
                    onChange={handleChange}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("password2", {
                        required: "Password is required",
                        // pattern: {
                        //   value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/,
                        //   message:
                        //     "Must be valid password",
                        // },
                    })}
                    onChange={handleChange}
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  error={!!errors.password2}
                  helperText={errors.password2 ? errors.password2.message : ''}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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