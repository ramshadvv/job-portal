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

import {useEffect,useState,useContext} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import Spinner from "../../utils/Spinner";

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

export default function EditProfile() {
    const { register, handleSubmit, formState: {errors},reset } = useForm()
    const {authToken} = useContext(AuthContext)
    const navigate = useNavigate();
    const [pro,setPro] = useState();
    const [loading, setLoading] = useState(false)

  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    if (data.image && data.image != pro.image)
      form_data.append("image", data.image[0], data.image.name);
    form_data.append("first_name", data.first_name);
    form_data.append("last_name", data.last_name);
    form_data.append("email", data.email);
    form_data.append("phone", data.phone);
    form_data.append("username", data.username);
    form_data.append("password", data.password);
    form_data.append("password2", data.password2);
    form_data.append("status", 'other');

    return form_data
  };
    
    const onSubmit = async (data)=> {
        if(data.password !== data.password2){
            Swal.fire("Error", "Password must be same!!");
        }else{
          setLoading(true)
          let form_data = await createMyModelEntry(data);
            try {
                await axios.put(`${BaseUrl}/editprofile/`, form_data,{
                headers:{
                  "Authorization" : `Bearer ${authToken}`,
                  'Content-Type' :'multipart/form-data', 
                }
                }).then(async (response) => {
                  setLoading(false)
                  navigate('/profile')
                    
                });
            } catch (error) {
              setLoading(false)
                console.log(error);
               
                Swal.fire("Error", "Something went wrong");
            }

        }
    };

    const fetchUserDetails=async(authToken)=>{
      setLoading(true)
      const result = await axios.get(`${BaseUrl}/profile/`, { headers: {"Authorization" : `Bearer ${authToken}`} })
      setPro  (result.data)
      reset(result.data)
      setLoading(false)
    }

  useEffect(()=>{
    fetchUserDetails(authToken)
  },[])

  if(loading){
    return <Spinner />
}

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
            EDIT
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
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    focused
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
                    required
                    fullWidth
                    focused
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
                    required
                    fullWidth
                    focused
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
                    required
                    focused
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
                    required
                    focused
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
                    {...register("image")}
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}