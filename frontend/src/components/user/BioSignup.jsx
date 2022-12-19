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

export default function BioSignup() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)

    const [userData, setUserData] = useState({
      biography:"",
      linkedin: "",
      github: "",
      resume: "",
  });

  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    if (data.resume)
      form_data.append("resume", data.resume, data.resume.name);
    form_data.append("biography", data.biography);
    form_data.append("linkedin", data.linkedin);
    form_data.append("github", data.github);

    return form_data
  };

  const handleChange= (e) => {
    let data = e.target.value
    console.log(userData)
    if(typeof(data) === 'string'){
      data = data.toUpperCase()
    }
    setUserData({
      ...userData,
      [e.target.name]: data,
    });
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0],
    });
  };
    
  const onSubmit = async ()=> {
    try {
      let form_data = await createMyModelEntry(userData)
      console.log(authToken);
      await axios.post(BaseUrl + '/addbio/', form_data,{
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
            Resume
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    {...register("biography")}
                    onChange={handleChange}
                    autoComplete="given-name"
                    name="biography"
                    multiline
                    required
                    fullWidth
                    id="biography"
                    label="Biography"
                    error={!!errors.biography}
                    helperText={errors.biography ? errors.biography.message : ''}
                    autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("linkedin")}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="linkedin"
                    label="Linkedin link"
                    name="linkedin"
                    autoComplete="family-name"
                    error={!!errors.linkedin}
                    helperText={errors.linkedin ? errors.linkedin.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("github")}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="github"
                    label="Github link"
                    name="github"
                    autoComplete="family-name"
                    error={!!errors.github}
                    helperText={errors.github ? errors.github.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("resume", {
                        required: "Resume is required",
                    })}
                    onChange={handleFileChange}
                    required
                    fullWidth
                    focused
                    id="resume"
                    label="Resume"
                    name="resume"
                    type="file"
                    autoComplete="family-name"
                    error={!!errors.resume}
                    helperText={errors.resume ? errors.resume.message : ''}
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