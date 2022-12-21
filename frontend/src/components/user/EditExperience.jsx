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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';

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

export default function EditExperience() {
    const { register, handleSubmit, formState: {errors},reset } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)
    const [expe, setExpe] = useState()
    const values = useParams()
    const [loading, setLoading] = useState(false)

    const createMyModelEntry = async (data) => {
      let form_data = new FormData();
      form_data.append("companyname", data.companyname);
      form_data.append("is_working", data.is_working);
      form_data.append("designation", data.designation);
      form_data.append("curr_salary", data.curr_salary);
      form_data.append("date_of_join", data.date_of_join);
      form_data.append("resign_date", data.resign_date);
      form_data.append("exp_year", data.exp_year);
      form_data.append("status", data.status);
  
      return form_data
    };
  const onSubmit = async (data)=> { 
    try {
      setLoading(true)
      let form_data = await createMyModelEntry(data);
      await axios.put(`${BaseUrl}/editexperience/${expe.id}/`, form_data,{
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

  const fetchExpeDetails=async(authToken)=>{
    setLoading(true)
    const result = await axios.get(`${BaseUrl}/experience/${values.id}/`, { 
      headers: {"Authorization" : `Bearer ${authToken}`} 
    })
    setExpe(result.data)
    reset(result.data)
    setLoading(false)
  }

  useEffect(()=>{
    fetchExpeDetails(authToken)
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
            Experience
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    {...register("companyname", {
                        required: "companyname is required",
                        pattern: {
                          value: /^[A-Za-z\s]{1,}$/,
                          message:
                            "companyname be Characters",
                        },
                    })}
                    autoComplete="given-name"
                    name="companyname"
                    required
                    focused
                    fullWidth
                    id="companyname"
                    label="Company Name"
                    error={!!errors.companyname}
                    helperText={errors.companyname ? errors.companyname.message : ''}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("designation", {
                        required: "Designation is required",
                        pattern: {
                          value: /^[A-Za-z\s]{1,}$/,
                          message:
                            "Designation must be characters",
                        },
                    })}
                    required
                    fullWidth
                    focused
                    id="designation"
                    label="Designation"
                    name="designation"
                    autoComplete="family-name"
                    error={!!errors.designation}
                    helperText={errors.designation ? errors.designation.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("curr_salary", {
                        required: "Current salary is required",
                        pattern: {
                          value: /^[0-9]{1,}$/,
                          message:
                            "Current salary must be characters",
                        },
                    })}
                    required
                    fullWidth
                    focused
                    id="curr_salary"
                    label="Current Salary"
                    name="curr_salary"
                    autoComplete="family-name"
                    type='number'
                    error={!!errors.curr_salary}
                    helperText={errors.curr_salary ? errors.curr_salary.message : ''}
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
                    fullWidth
                    focused
                    id="exp_year"
                    label="Experience Year"
                    name="exp_year"
                    autoComplete="family-name"
                    error={!!errors.exp_year}
                    helperText={errors.exp_year ? errors.exp_year.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Is working</InputLabel>
                <RadioGroup
                  {...register("is_working", {
                      required: "is_working is required",
                  })}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="True"
                  name="is_working"
                  id="is_working" 
                  autoComplete="is_working"
                  sx={{display:'flex', flexDirection:'row'}}
                >
                  <FormControlLabel 
                    value="True" 
                    control={<Radio />} 
                    label="Yes" 
                  />
                  <FormControlLabel 
                    value="False" 
                    control={<Radio />} 
                    label="No" 
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("date_of_join", {
                        required: "companyname is required",
                    })}
                    focused
                    autoComplete="given-name"
                    name="date_of_join"
                    required
                    fullWidth
                    id="date_of_join"
                    label="Date of Join"
                    type='date'
                    error={!!errors.date_of_join}
                    helperText={errors.date_of_join ? errors.date_of_join.message : ''}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    {...register("resign_date", {
                        required: "resign_date is required",
                    })}
                    focused
                    autoComplete="given-name"
                    name="resign_date"
                    required
                    fullWidth
                    id="resign_date"
                    label="Resignation Date"
                    type='date'
                    error={!!errors.resign_date}
                    helperText={errors.resign_date ? errors.resign_date.message : ''}
                    autoFocus
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