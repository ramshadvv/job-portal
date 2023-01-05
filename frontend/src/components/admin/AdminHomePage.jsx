import React from 'react';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Copyright } from './AdminDashboard';

// import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from './utils/Chart';
import Deposits from './utils/Deposits';
import Orders from './utils/Orders';

import {useState} from 'react';
// import axios from 'axios';
// import BaseUrl from '../../context/BaseUrl';
// import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2'
// import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';



function AdminHomePage() {
    // const navigate = useNavigate();
    // const {ownerToken} = useContext(AuthContext)
    const [loading] = useState(false)


  if(loading){
    return <Spinner />
  }

   return (
     <div>
        <Box sx={{display:'flex'}}>
            <AdminDashboard />
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
                  <Deposits title={'Owner'} values={5} dateupdate={'on 15 March, 2019'} />
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
                  <Deposits title={'Recent Deposits'} values={'$ 3,024.00'} dateupdate={'on 15 March, 2019'} />
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
 
 export default AdminHomePage;
 