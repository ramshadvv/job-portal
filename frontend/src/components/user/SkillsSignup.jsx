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
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

import {useState, useContext} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import NavBar from './NavBar';

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


export default function SkillsSignup() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)

    const [userData, setUserData] = useState({
      skill:"",
      exp_year: "",
  });
  const handleChange= (e) => {
    let data = e.target.value
    console.log(typeof(data))
    if(typeof(data) === 'string'){
      data = data.toUpperCase()
    }
    setUserData({
      ...userData,
      [e.target.name]: data,
    });
    console.log(userData)
  };
    
  const onSubmit = async ()=> {
    try {
      await axios.post(BaseUrl + '/addskill/', userData,{
        headers:{
          "Authorization" : `Bearer ${authToken}`,
          'Content-Type' :'multipart/form-data', 
        }
      }).then(async (response) => {
        console.log(response)
        navigate('/profile')  
      });
    } catch (error) {
        console.log(error);
        setUserData({
        status: false,
        });
        Swal.fire("Error", "Something went wrong");
    }

  }

  return (
    <>
    <NavBar />
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
            Add Skills
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    {...register("skill", {
                        required: "Skill is required",
                        pattern: {
                          value: /^[A-Za-z\s]{1,}$/,
                          message:
                            "Skill be Characters",
                        },
                    })}
                    onChange={handleChange}
                    autoComplete="given-name"
                    name="skill"
                    required
                    fullWidth
                    id="skill"
                    label="Skill"
                    error={!!errors.skill}
                    helperText={errors.skill ? errors.skill.message : ''}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("exp_year", {
                        required: "Experience year is required",
                        pattern: {
                          value: /^[0-9]{1,}$/,
                          message:
                            "Experience year must be characters",
                        },
                    })}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="exp_year"
                    label="Experience Year"
                    name="exp_year"
                    autoComplete="family-name"
                    error={!!errors.exp_year}
                    helperText={errors.exp_year ? errors.exp_year.message : ''}
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
    </>
  );
}