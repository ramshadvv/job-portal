import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentsIcon from '@mui/icons-material/Payments';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import {useContext, useState, useEffect} from 'react'
import NavBar from './NavBar'
import AuthContext from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import BaseUrl from '../../context/BaseUrl';
import axios from 'axios';
import { Box } from '@mui/system';
import Popup from '../../utils/Popup';

// import SearchBar from './SearchBar/SearchBar';

import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Spinner from '../../utils/Spinner';
import ViewJob from './ViewJob/ViewJob';
import ApplyJobfrom from './ViewJob/ApplyJobfrom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#b09af326',
    '&:hover': {
      backgroundColor: '#9791a926',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


const HomePage = () => {
    const {user, authToken} = useContext(AuthContext)
    const [jobs,setJobs] = useState([])
    const [loading, setLoading] =useState(false)
    const [searchData, setSearchData] = useState({search:''})
    const [openPopup, setOpenPopup] = useState(false);
    const [openformPopup, setformOpenPopup] = useState(false);
    const [viewJob,setViewJob]=useState({})
    
    const fetchJobList = async (authToken) => {
        setLoading(true)
        await axios.get(`${BaseUrl}/alljobposts/`, 
            { headers: {"Authorization" : `Bearer ${authToken}`} 
        }).then((response)=>{
            setJobs(response.data)
            console.log(response.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)

        })
    }

    const handleChange= (e) => {
        setSearchData({
        [e.target.name]: e.target.value,
      });
    };

    const fetchSearchList = async () => {
        setLoading(true)
        await axios.get(`${BaseUrl}/alljobposts/`, 
            { headers: {"Authorization" : `Bearer ${authToken}`},
            params:searchData
        }).then((response)=>{
            setJobs(response.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            if(err.response.data.error === 'no data available'){
                setJobs([])
                console.log('----------------------')
            }
            setLoading(false)

        })
    }

    const handlePopupOpen =(item)=>{
        setViewJob(item);
        setOpenPopup(true)
    }
    const handleformPopupOpen =()=>{
        setformOpenPopup(true)
    }
    

    useEffect(() => {
        fetchJobList(authToken)
    }, [])

    if(loading){
        return(
            <Spinner />
        )
    }

    if (!user){
        return <Navigate to="/" />
    }

  return (
    <div>
        <NavBar/>
        <Box display={'flex'} justifyContent={'center'}  style={{marginTop:'3rem'}}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            name='search'
            id='search'
            onChange={handleChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        
        <Button variant='outlined' type='submit' onClick={fetchSearchList}>Search</Button>
        </Box>
        <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
            {jobs.length !== 0 ?jobs.map((job)=>{
                return(
                    <Grid item sm={6} display={'flex'} key={job.id}>
                        <Card sx={{ width:600, marginLeft:'3rem', margin:'3rem', height:'max-content',minHeight:'18rem' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {job.job_title.toUpperCase()}
                                </Typography>
                                <Typography color={'#7070e7'} sx={{fontWeight:'bold'}}>
                                    {job.company_name}
                                </Typography>
                                <Typography>
                                    {job.company_place}
                                </Typography>
                                <Box display={'flex'} justifyContent={'left'}>   
                                    <Box sx={{backgroundColor:'#c9f5a866', width:'max-content', padding:'2px 10px' }}><PaymentsIcon fontSize='string' />{`₹ ${job.job_salary}`}{job.job_salaryto?` - ₹ ${job.job_salaryto} per Month`: ''}</Box> 
                                    {job.job_sechedule?
                                    <Box sx={{backgroundColor:'#c9f5a866', width:'max-content', padding:'2px 10px', marginLeft:'1rem' }}><WatchLaterIcon fontSize='string' />{' '+job.job_sechedule}</Box>: ''}
                                </Box>
                                <List>
                                    <ListItem>
                                    <ListItemText
                                        primary={job.job_descri.slice(0,65) + ' ...'}
                                        />
                                    
                                    </ListItem>
                                    <ListItem>
                                    <ListItemText
                                        primary="Apply With Your Resume."
                                    />
                                    <Button size="small"  onClick={()=>handlePopupOpen(job)}>View</Button>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
                :
                <Typography sx={{marginTop:'3rem'}}>No posts are available</Typography> 
            }
        </Grid>
        <Popup title={viewJob.username? viewJob.job_title: 'JOB'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <ViewJob viewJob={viewJob} setOpenPopup={setOpenPopup} setformOpenPopup={setformOpenPopup} />
        </Popup>
        <Popup title={'JOB'} openPopup={openformPopup} setOpenPopup={setformOpenPopup}>
            <ApplyJobfrom jobid={viewJob.id} job_title={viewJob.job_title} setformOpenPopup={setformOpenPopup}></ApplyJobfrom>
        </Popup>
    </div>
  )
}

export default HomePage