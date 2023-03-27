import React from 'react';

// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import {useState, useContext} from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import BaseUrl from '../../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../../context/AuthContext';
// import Spinner from "../../utils/Spinner";



function ApplyJobfrom(props) {
    const {jobid, job_title, setformOpenPopup} = props
    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate();
    const {authToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const createMyModelEntry = async (data) => {
        let form_data = new FormData();
        form_data.append("app_job", jobid);
        form_data.append("cover_letter", data.cover_letter);
    
        return form_data
      };

      const onSubmit = async (data)=> {
        setLoading(true)
        let form_data = await createMyModelEntry(data);
        try {
          await axios.post(`${BaseUrl}/applyjobs/`, form_data,{
            headers:{
              "Authorization" : `Bearer ${authToken}`,
              'Content-Type' :'multipart/form-data', 
            }
          }).then(async (response) => {
            setLoading(false)
            console.log(response)
            Swal.fire({
                title: "Your job Job Applied successfully",
                text: "Recuirters will connect you soon!!",
                icon: "success",
                button: "OK",
              });
            navigate('/home')  
          });
        } catch (error) {
          setLoading(false)
          console.log(error.response.data.error === 'Job is already applied')
            if(error.response.data.error === 'Job is already applied')
            Swal.fire({
                title: "You already applied",
                icon: "error",
                button: "OK",
            });
            else
            Swal.fire("Error", "Something went wrong");
        }
    
      }
  return (
    <div>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                
                <Typography 
                    component="h1"
                    variant="h5"
                    sx={{
                        marginBottom:5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {job_title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    {...register("cover_letter")}
                    required
                    focused
                    fullWidth
                    id="cover_letter"
                    label="Cover Letter"
                    multiline
                    name="cover_letter"
                    autoComplete="family-name"
                    error={!!errors.cover_letter}
                    helperText={errors.cover_letter ? errors.cover_letter.message : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                setformOpenPopup(false);
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
    </div>
  );
}

export default ApplyJobfrom;
