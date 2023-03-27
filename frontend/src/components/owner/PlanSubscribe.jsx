import React, {useEffect, useContext, useState} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import AuthContext from '../../context/AuthContext';

import Spinner from '../../utils/Spinner';
import BaseUrl from '../../context/BaseUrl';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

export default function PlanSubscribe() {
    const {ownerToken, logoutOwner} = useContext(AuthContext)
    const [row, setRow] =useState([])
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate();

  const fetchPlanDetails=async(ownerToken)=>{
    try{
      setLoading(true)
      const result = await axios.get(`${BaseUrl}/subscriptionplan/`, {
        headers: {"Authorization" : `Bearer ${ownerToken}`} 
      })
      setRow(result.data)
      setLoading(false)

    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }


  const createMyModelEntry = async (data) => {
    console.log(data.plan)
    let form_data = new FormData();
    form_data.append("plan", data.plan);
    return form_data
  };
    const onSubmit = async (id)=> { 
      const userData = {'plan':id}
          let form_data = await createMyModelEntry(userData)
            try {
                await axios.post(`${BaseUrl}/purchaseplan/`, form_data,{
                  headers: {"Authorization" : `Bearer ${ownerToken}`} 
                }).then((response) => {
                  Swal.fire("Success", "Plan purchased successfully");
                  navigate(`/owner`)
                });
            } catch (error) {
                console.log(error);
                Swal.fire("Error", "Pls buy a plan");
            }
    };

  useEffect(() => {
    fetchPlanDetails(ownerToken)
  }, []);

  if(loading){
    return <Spinner />
  }

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={8} textAlign="center">
          <Box mb={3}>
            <Container maxWidth="sm">
              <Typography variant="h3" component="h2" gutterBottom={true}>
                <Typography variant="h3" component="span" color="primary">PRICING</Typography>
              </Typography>
            </Container>
          </Box>
          <Grid container spacing={3}  sx={{marginTop:'3rem'}}>
            {row.length !== 0?
                row.map((row)=>{
                    return(
                        <Grid item xs={12} md={4} key={row.id}>
                          <Card variant="outlined">
                            <CardHeader title={row.sub_name} sx={{marginTop:'2rem'}}></CardHeader>
                            <CardContent>
                              <Box px={1}>
                                <Typography variant="h3" component="h2" gutterBottom={true}>
                                  {'₹ ' + row.sub_price}
                                  <Typography variant="h6" color="textSecondary" component="span">{' / mo'}</Typography>
                                </Typography>
                                <Typography color="textSecondary" variant="subtitle1" component="p" sx={{marginTop:'2rem'}}>{row.no_staff ? row.no_staff : 'Unlimited'} Staffs</Typography>
                                <Typography color="textSecondary" variant="subtitle1" component="p">{row.no_job ? row.no_job :'Unlimited'} Jobs</Typography>
                                <Typography color="textSecondary" variant="subtitle1" component="p" paragraph={true}>{'24 x 7 Support'}</Typography>
                              </Box>
                              <Button variant="outlined" color="primary" sx={{margin:'2rem'}} onClick={()=>{onSubmit(row.id)}}>Buy</Button>
                            </CardContent>
                          </Card>
                        </Grid>
                    )
                })
            :''}
          </Grid>
          <Grid sx={{marginTop:'2rem'}}>
            <Typography variant="h6" color="textSecondary" component="span">{'If you are already buy a plan, You '} <br />{'just wait for the approval'} <br />{'Do you want to'} <span onClick={logoutOwner} style={{color:'#7a7af2', textDecoration:'underline', cursor:'pointer'}}>Logout ?</span></Typography>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
