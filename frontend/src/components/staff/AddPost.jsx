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
import StaffDashboard from './StaffDashboard';
import Toolbar from '@mui/material/Toolbar';

import {useState, useContext} from 'react';
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


export default function AddPost() {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate();
    const {staffToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const createMyModelEntry = async (data) => {
      let form_data = new FormData();
      form_data.append("job_title", data.job_title);
      form_data.append("job_salary", data.job_salary);
      form_data.append("job_salaryto", data.job_salaryto);
      form_data.append("job_type", data.job_type);
      form_data.append("job_qualif", data.job_qualif);
      form_data.append("job_descri", data.job_descri);
      form_data.append("job_respon", data.job_respon);
      form_data.append("job_requir", data.job_requir);
      form_data.append("job_sechedule", data.job_sechedule);
      form_data.append("job_relocate", data.job_relocate);
      form_data.append("job_education", data.job_education);
      form_data.append("job_experience", data.job_experience);
  
      return form_data
    };

    
  const onSubmit = async (data)=> {
    setLoading(true)
    let form_data = await createMyModelEntry(data);
    try {
      await axios.post(`${BaseUrl}/jobposts/`, form_data,{
        headers:{
          "Authorization" : `Bearer ${staffToken}`,
          'Content-Type' :'multipart/form-data', 
        }
      }).then(async (response) => {
        setLoading(false)
        console.log(response)
        Swal.fire({
            title: "Your job added successfully",
            text: "Please wait for confirmation",
            icon: "success",
            button: "OK",
          });
        navigate('/staff/jobs')
        // handleClick()

      });
    } catch (error) {
        setLoading(false)
        console.log(error);
        Swal.fire("Error", "Something went wrong");
    }

  }

  if(loading){
    return <Spinner />
  }

  return (
    <>
    <Box sx={{display:'flex'}}>
            <StaffDashboard />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight:'77vh' }}>
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
                    Add Job
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_title", {
                                required: "Title for job is required",
                            })}
                            required
                            fullWidth
                            id="job_title"
                            label="Job Title"
                            name="job_title"
                            autoComplete="family-name"
                            error={!!errors.job_title}
                            helperText={errors.job_title ? errors.job_title.message : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            {...register("job_salary", {
                                required: "Salary for job is required",
                                pattern: {
                                  value: /^[0-9]{1,}$/,
                                  message:
                                    "Salary must be number",
                                },
                            })}
                            required
                            fullWidth
                            id="job_salary"
                            label="Salary From"
                            name="job_salary"
                            type='number'
                            autoComplete="family-name"
                            error={!!errors.job_salary}
                            helperText={errors.job_salary ? errors.job_salary.message : ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            {...register("job_salaryto", {
                                pattern: {
                                  value: /^[0-9]{1,}$/,
                                  message:
                                    "Salary must be number",
                                },
                            })}
                            autoComplete="given-name"
                            name="job_salaryto"
                            required
                            type='number'
                            fullWidth
                            id="job_salaryto"
                            label="Salary To"
                            error={!!errors.job_salaryto}
                            helperText={errors.job_salaryto ? errors.job_salaryto.message : ''}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_type", {
                                required: "Type for job is required",
                            })}
                            required
                            fullWidth
                            id="job_type"
                            label="Job Type"
                            name="job_type"
                            autoComplete="family-name"
                            error={!!errors.job_type}
                            helperText={errors.job_type ? errors.job_type.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_qualif", {
                                required: "Qualification for job is required",
                            })}
                            required
                            fullWidth
                            id="job_qualif"
                            label="Qualification"
                            placeholder='Each qualifications seperated by dot'
                            name="job_qualif"
                            autoComplete="family-name"
                            error={!!errors.job_qualif}
                            helperText={errors.job_qualif ? errors.job_qualif.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_descri", {
                              required: "Discription for job is required",
                          })}
                            autoComplete="given-name"
                            name="job_descri"
                            multiline
                            required
                            fullWidth
                            id="job_descri"
                            label="Description"
                            error={!!errors.job_descri}
                            helperText={errors.job_descri ? errors.job_descri.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_respon")}
                            autoComplete="given-name"
                            name="job_respon"
                            multiline
                            required
                            fullWidth
                            id="job_respon"
                            label="Resposibilities"
                            placeholder='Each Resposibilities seperated by dot'
                            error={!!errors.job_respon}
                            helperText={errors.job_respon ? errors.job_respon.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_requir")}
                            autoComplete="given-name"
                            name="job_requir"
                            multiline
                            required
                            fullWidth
                            id="job_requir"
                            label="Requirements"
                            placeholder='Each Requirements seperated by dot'
                            error={!!errors.job_requir}
                            helperText={errors.job_requir ? errors.job_requir.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_sechedule")}
                            autoComplete="given-name"
                            name="job_sechedule"
                            multiline
                            required
                            fullWidth
                            id="job_sechedule"
                            label="Schedule"
                            placeholder='Each Schedule seperated by dot'
                            error={!!errors.job_sechedule}
                            helperText={errors.job_sechedule ? errors.job_sechedule.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_relocate")}
                            autoComplete="given-name"
                            name="job_relocate"
                            multiline
                            required
                            fullWidth
                            id="job_relocate"
                            label="Relocate"
                            error={!!errors.job_relocate}
                            helperText={errors.job_relocate ? errors.job_relocate.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_education")}
                            autoComplete="given-name"
                            name="job_education"
                            multiline
                            required
                            fullWidth
                            id="job_education"
                            label="Education"
                            placeholder='Each Education seperated by dot'
                            error={!!errors.job_education}
                            helperText={errors.job_education ? errors.job_education.message : ''}
                            autoFocus />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("job_experience")}
                            autoComplete="given-name"
                            name="job_experience"
                            multiline
                            required
                            fullWidth
                            id="job_experience"
                            label="Experience"
                            placeholder='Each Experience seperated by dot'
                            error={!!errors.job_experience}
                            helperText={errors.job_experience ? errors.job_experience.message : ''}
                            autoFocus />
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
    </>
  );
}