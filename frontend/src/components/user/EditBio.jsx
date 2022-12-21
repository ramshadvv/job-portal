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

import {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import NavBar from './NavBar';
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

export default function EditBio() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)
    const [bio, setBio] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      fetchBioDetails(authToken)
    },[])

  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    if (data.resume && data.resume != bio.resume)
      form_data.append("resume",data.resume[0],data.resume.name);
    form_data.append("biography", data.biography);
    form_data.append("linkedin", data.linkedin);
    form_data.append("github", data.github);

    return form_data
  };

  const onSubmit = async (data)=> {
    try {
      setLoading(true)
      let form_data = await createMyModelEntry(data);
      await axios.put(`${BaseUrl}/editbio/${bio.id}/`, form_data,{
        headers:{
          "Authorization" : `Bearer ${authToken}`,
          'Content-Type' :'multipart/form-data', 
        }
      }).then(async (response) => {
        setLoading(false)
        console.log(response)
        navigate('/profile')  
      });
    } catch (error) {
      setLoading(false)
        console.log(error);
        Swal.fire("Error", "Something went wrong");
    }

  }

  const fetchBioDetails=async(authToken)=>{
    setLoading(true)
    const result = await axios.get(`${BaseUrl}/bio/`, { 
      headers: {"Authorization" : `Bearer ${authToken}`} 
    })
    setBio(result.data)
    reset(result.data)
    setLoading(false)
  }

  if(loading){
    return <Spinner />
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
                    autoComplete="given-name"
                    focused
                    name="biography"
                    multiline
                    required
                    fullWidth
                    id="biography"
                    label="Biography"
                    // value={bio.length!==0 ? bio.biography :''}
                    error={!!errors.biography}
                    helperText={errors.biography ? errors.biography.message : ''}
                    autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("linkedin")}
                    required
                    focused
                    fullWidth
                    id="linkedin"
                    label="Linkedin link"
                    name="linkedin"
                    // value={bio.length!==0 ? bio.linkedin : ''}
                    autoComplete="family-name"
                    error={!!errors.linkedin}
                    helperText={errors.linkedin ? errors.linkedin.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("github")}
                    required
                    focused
                    fullWidth
                    id="github"
                    label="Github link"
                    name="github"
                    // value={bio.length!==0 ? bio.github : ''}
                    autoComplete="family-name"
                    error={!!errors.github}
                    helperText={errors.github ? errors.github.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("resume")}
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