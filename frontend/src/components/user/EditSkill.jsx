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

import {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate, useParams} from 'react-router-dom';
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


export default function SkillsSignup() {
    const { register, handleSubmit, formState: {errors},reset } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)
    const [ski, setSki] = useState()
    const values = useParams()
    const [loading, setLoading] = useState(false)

    const createMyModelEntry = async (data) => {
      let form_data = new FormData();
      form_data.append("skill", data.skill);
      form_data.append("exp_year", data.exp_year);
  
      return form_data
    };

    
  const onSubmit = async (data)=> {
    setLoading(true)
    let form_data = await createMyModelEntry(data);
    try {
      await axios.put(`${BaseUrl}/editskill/${ski.id}/`, form_data,{
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

  const fetchSkiDetails=async(authToken)=>{
    setLoading(true)
    const result = await axios.get(`${BaseUrl}/skill/${values.id}/`, { 
      headers: {"Authorization" : `Bearer ${authToken}`} 
    })
    setSki(result.data)
    reset(result.data)
    setLoading(false)
  }

  useEffect(()=>{
    fetchSkiDetails(authToken)
  },[])

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
            Edit Skills
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
                    autoComplete="given-name"
                    name="skill"
                    required
                    focused
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
                    required
                    focused
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