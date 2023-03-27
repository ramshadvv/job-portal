import React from 'react';
import OwnerDashboard from './OwnerDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Copyright } from './OwnerDashboard';


// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from './utils/Chart';
import Deposits from './utils/Deposits';
import Orders from './utils/Orders';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';

function HomePage() {
    const navigate = useNavigate();
    const {ownerToken, owner, logoutOwner} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [plan, setPlan] = useState([])
    const [cmp, setCmp] = useState([])
    
  
  const fetchCmpDetails=async(ownerToken)=>{
    try{
      setLoading(true)
      const result = await axios.get(`${BaseUrl}/companydetails/`, {
        headers: {"Authorization" : `Bearer ${ownerToken}`} 
      })
      setCmp(result.data)
      setLoading(false)
    }catch(err){
      setLoading(false)
      if(err.response.data.errors === 'company is not exists'){
        navigate('/owner/addcompany')
      }
    }
  }

  const fetchPlanDetails=async(ownerToken)=>{
    try{
      setLoading(true)
      const result = await axios.get(`${BaseUrl}/purchaseplan/`, {
        headers: {"Authorization" : `Bearer ${ownerToken}`} 
      })
      setPlan(result.data)
      setLoading(false)

    }catch(err){
      setLoading(false)
      if(err.response.data.errors === 'plan is not exists'){
        navigate('/owner/subscribeplan')
      }
    }
  }

  if(owner && plan.length !== 0 && cmp.length !== 0){
      if(owner.is_approved == false){
      logoutOwner()
      Swal.fire("Sorry", "You just wait for Approval!!");
    }
    }

  useEffect(() => {
    fetchCmpDetails(ownerToken);
    fetchPlanDetails(ownerToken);
  }, []);
    
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
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                    <Deposits title={'Jobs'} values={10} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                  <Deposits title={'Applications'} values={30} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                  <Deposits title={'Selected'} values={20} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                  <Deposits title={'Rejected'} values={10} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                  <Deposits title={'Staff'} values={15} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 115,
                    }}
                  >
                  <Deposits title={'Current Plan'} values={'Basic'} dateupdate={'on 15 March, 2019'} />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} lg={6} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 380,
                    }}
                  >
                  <Chart title={'Weekly'} />
                  </Paper>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} lg={6} sx={{marginBottom:'2rem'}}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 380,
                    }}
                  >
                    <Chart title={'Monthly'} />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12} sx={{marginBottom:'2rem'}}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minWidth:'30rem' }}>
                    <Orders title={'Recent Jobs'}  />
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
     </div>
   );
 }
 
 export default HomePage;
 