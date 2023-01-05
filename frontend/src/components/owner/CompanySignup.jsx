import React from 'react';
import OwnerDashboard from './OwnerDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Copyright } from './OwnerDashboard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useState,useContext} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';
 

const theme = createTheme();


 function CompanySignup() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();
    const {ownerToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)


    const createMyModelEntry = async (data) => {
        let form_data = new FormData();
        form_data.append("cmp_name", data.cmp_name);
        form_data.append("cmp_place", data.cmp_place);
        form_data.append("cmp_phone", data.cmp_phone);
        form_data.append("cmp_address", data.cmp_address);
    
        return form_data
      };
    
    
  const onSubmit = async (data)=> {
    setLoading(true)
    try {
        let form_data = await createMyModelEntry(data);
      await axios.post(BaseUrl + '/addcompany/', form_data,{
        headers:{
          "Authorization" : `Bearer ${ownerToken}`,
          'Content-Type' :'multipart/form-data',
        }
      }).then(async (response) => {
        console.log(response)
        navigate('/owner/home') 
        setLoading(false)
      });
    } catch (error) {
        console.log(error);
        setLoading(false)
        Swal.fire("Error", "Something went wrong");
    }

  }

  if(loading){
    return <Spinner />
  }

   return (
     <div>
        <Box sx={{display:'flex'}}>
            <OwnerDashboard />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            width:'100%'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                    Register Company
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("cmp_name", {
                                    pattern: {
                                    value: /^[A-Za-z0-9\s]{0,}$/,
                                    message:
                                        "cmp_name be Characters",
                                    },
                                })}
                                autoComplete="given-name"
                                name="cmp_name"
                                required
                                fullWidth
                                id="cmp_name"
                                label="Company Name"
                                error={!!errors.cmp_name}
                                helperText={errors.cmp_name ? errors.cmp_name.message : ''}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("cmp_place", {
                                    pattern: {
                                    value: /^[A-Za-z0-9\s]{1,}$/,
                                    message:
                                        "Place must be characters",
                                    },
                                })}
                                required
                                fullWidth
                                id="cmp_place"
                                label="Place"
                                name="cmp_place"
                                autoComplete="family-name"
                                error={!!errors.cmp_place}
                                helperText={errors.cmp_place ? errors.cmp_place.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("cmp_phone", {
                                    maxLength:10,
                                    minLength:10,
                                    pattern: {
                                    value: /^[0-9\s]{1,}$/,
                                    message:
                                        "Phone must be Valid",
                                    },
                                })}
                                required
                                fullWidth
                                id="cmp_phone"
                                label="Phone"
                                name="cmp_phone"
                                autoComplete="family-name"
                                error={!!errors.cmp_phone}
                                helperText={errors.cmp_phone ? errors.cmp_phone.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("cmp_address", {
                                    pattern: {
                                    value: /^[A-Za-z0-9,.\s]{1,}$/,
                                    message:
                                        "Address must be characters",
                                    },
                                })}
                                required
                                fullWidth
                                id="cmp_address"
                                label="Address"
                                name="cmp_address"
                                autoComplete="family-name"
                                error={!!errors.cmp_address}
                                helperText={errors.cmp_address ? errors.cmp_address.message : ''}
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
          </Container>
        </Box>
        </Box>
     </div>
   );
 }
 
 export default CompanySignup;
 