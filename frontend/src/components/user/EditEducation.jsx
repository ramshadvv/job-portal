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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate,useParams} from 'react-router-dom';
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

const year_list = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009]

export default function EditEducation() {
    const { register, handleSubmit, formState: {errors},reset } = useForm()
    const navigate = useNavigate();
    const values = useParams()
    const {authToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [year, setYear] = useState(2022)
    const [educ, setEduc] = useState()

  const yearChange=(e)=>{
    setYear(e.target.value);
  }
  
  const createMyModelEntry = async (data) => {
    let form_data = new FormData();
    form_data.append("course", data.course);
    form_data.append("university", data.university);
    form_data.append("passout", data.passout);

    return form_data
  };

  const onSubmit = async (data)=> {
    try {
      setLoading(true)
      let form_data = await createMyModelEntry(data);
      await axios.put(`${BaseUrl}/editeducation/${educ.id}/`, form_data,{
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

  const fetchEducDetails=async(authToken)=>{
    setLoading(true)
    const result = await axios.get(`${BaseUrl}/education/${values.id}/`, {
      headers: {"Authorization" : `Bearer ${authToken}`} 
    })
    setEduc(result.data)
    reset(result.data)
    setLoading(false)
  }

  useEffect(()=>{
    fetchEducDetails(authToken)
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
            Academic
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    {...register("course")}
                    
                    autoComplete="given-name"
                    name="course"
                    required
                    focused
                    fullWidth
                    id="course"
                    label="Course"
                    error={!!errors.course}
                    helperText={errors.course ? errors.course.message : ''}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("university")}
                    
                    required
                    fullWidth
                    focused
                    id="university"
                    label="University"
                    name="university"
                    autoComplete="family-name"
                    error={!!errors.university}
                    helperText={errors.university ? errors.university.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Passout Year</InputLabel>
                <Select
                    {...register("passout")}
                    onChange={yearChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="PassOut Year"
                  focused
                  value={year}
                  fullWidth
                  name="passout"
                >
                  {year_list.map((years) =>{
                    return(
                      <MenuItem value={years} key={years}>{years}</MenuItem>
                    )
                  })}
                </Select>
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