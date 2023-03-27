import React from 'react';
import StaffDashboard from './StaffDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Copyright } from './StaffDashboard';

import Card from '@mui/material/Card';
// import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';



function StaffProfile() {
    const navigate = useNavigate();
    const {staffToken, staff} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [cmp, setCmp] = useState({})

    console.log(staff);

    const toEditProfile = () =>{
        navigate('/staff/editprofile')
    }

    // const fetchCompanyDetails = async(staffToken) =>{
    //     setLoading(true)
    //     await axios.get(BaseUrl+'/companydetails', {
    //         headers:{
    //           'Content-Type':'application/json',
    //           Authorization:`Bearer  ${staffToken}`
    //         }
    //     }).then((response) =>{
    //         setLoading(false)
    //         if(response.status === 200){
    //             setCmp(response.data)
    //         }
    //     }).catch((err)=>{
    //         setCmp({})
    //         setLoading(false)

    //     })
    // }

    // useEffect(()=> {
    //     fetchCompanyDetails(staffToken)
    // }, [staffToken])


  if(loading){
    return <Spinner />
  }

   return (
     <div>
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight:'77vh', marginTop:'6rem' }}>
                    <Card id='education' sx={{ maxWidth: 900, marginLeft:'3rem' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                                COMPANY
                                {/* {cmp? */}
                                <Button size="small" sx={{marginLeft:'41rem'}}>Edit</Button>
                            </Typography>
                            <hr />
                            <List>
                                {cmp?
                                    <>
                                        <ListItem>
                                            <ListItemText
                                                primary={cmp.cmp_name}
                                            />
                                        </ListItem>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            PLACE  <span style={{marginLeft:'43px'}}> : </span> {cmp.cmp_place}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem', marginTop:'1rem'}}>
                                            LINKED IN <span style={{marginLeft:'17px'}}> : </span>{cmp.cmp_phone}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem', marginTop:'1rem'}}>
                                            GITHUB <span style={{marginLeft:'35px'}}> : </span>{cmp.cmp_address}
                                        </Typography>
                                    </>
                                :   <ListItemText>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            Company is Not Registered!!
                                        </Typography>
                                    </ListItemText>
                                }
                            </List>
                        </CardContent>
                    </Card>
                    <Card id='personal' sx={{ maxWidth: 900, marginLeft:'3rem', marginBottom:'5rem', marginTop:'3rem' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Staff Details
                            <Button size="small" sx={{marginLeft:'36rem'}} onClick={toEditProfile}>EDIT</Button>
                            </Typography>
                            <hr />
                            <List>
                                <ListItem>
                                <ListItemText
                                    primary={staff.first_name + ' ' + staff.last_name}
                                />
                                </ListItem>
                                <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                    {staff.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                    {staff.phone}
                                </Typography>
                            </List>
                        </CardContent>
                    </Card>
                </Container>
                <Copyright sx={{ mt: 5, mb:3 }} />
            </Box>
        </Box>
     </div>
   );
 }
 
 export default StaffProfile;
 