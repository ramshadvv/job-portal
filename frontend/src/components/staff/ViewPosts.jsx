import React from 'react';
import StaffDashboard from './StaffDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { Copyright } from './StaffDashboard';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import JobViewTable from './JobViewTable'

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';
import Popup from '../../utils/Popup';
import {useNavigate} from 'react-router-dom'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalSample from './utils/ModalSample';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

 function ViewPosts() {
    const {staffToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [jobid, setJobId] = useState()
    const [jobName, setJobName] = useState()
    const [jobStatus, setJobStatus] = useState()
    const navigate = useNavigate()
    const [openPopup, setOpenPopup] = useState(false);
    const [viewJob,setViewJob]=useState({})
  
    const handlePopupOpen =(item)=>{
      setViewJob(item);
      setOpenPopup(true)
      console.log(viewJob);
    }

    const fetchJobList = async(staffToken) =>{
      setLoading(true)
      await axios.get(BaseUrl+'/jobposts', {
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer  ${staffToken}`
          }
      }).then((response) =>{
          setLoading(false)
          if(response.status === 200){
              setRows(response.data)
              console.log(response.data)
          }
      }).catch((err)=>{
          setRows([])
          setLoading(false)

      })
  }

  const blockJob = async(id) => {
    setLoading(true)
    await axios.get(`${BaseUrl}/blockjob/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${staffToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('block or unblock')
      fetchJobList(staffToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  const deleteJob = async(id) => {
    setLoading(true)
    await axios.delete(`${BaseUrl}/deletejob/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${staffToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      fetchJobList(staffToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  useEffect(()=> {
    fetchJobList(staffToken)
  }, [])

  const handleDelete=(id, name)=>{
    setJobStatus('delete')
    setJobId(id)
    setJobName(name)
  }

  const handleBlock=(id, title, active)=>{
    if(active === true)
    setJobStatus('block')
    else
    setJobStatus('Unblock')
    setJobId(id)
    setJobName(`${title} Job`)
  }

  const toAddJob = () => {
    navigate('/staff/addjob')
  }

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

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight:'77vh' }}>
            <Typography variant="h5" sx={{fontWeight:'bold', textAlign:'center', marginBottom:'2rem'}} component="h1">
              JOBS
            </Typography>
            <Box display='flex' justifyContent='flex-end'>
              <Button sx={{cursor:'pointer', marginRight:'1rem', marginBottom:'1rem'}} 
                onClick={()=>{
                  toAddJob();
                }}
                variant='outlined'
                size='medium'
                color='info'
              >Add</Button>

            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Salary</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Expired date</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => {
                      return(
                        <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            {index+1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.job_title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.job_salary}</StyledTableCell>
                        <StyledTableCell align="center">{row.job_type}</StyledTableCell>
                        <StyledTableCell align="center">{row.job_expired}</StyledTableCell>
                        <StyledTableCell align="center"> 
                          <Button variant="outlined" color="secondary" onClick={()=>handlePopupOpen(row)}>
                            <OpenInBrowserIcon /> Open
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            {
                               row.is_active === false?
                              <BlockIcon sx={{color:'#4f4fde', cursor:'pointer'}} 
                              onClick={()=>{
                              handleOpen();
                              handleBlock(row.id, row.job_title, row.is_active);
                              }}
                               />
                              :
                              <Button sx={{color:'green', cursor:'pointer'}} 
                              onClick={()=>{
                              handleOpen();
                              handleBlock(row.id, row.job_title, row.is_active);
                              }}
                              >ACTIVE</Button>
                            }
                            <DeleteIcon sx={{color:'#ef5a5a', cursor:'pointer',marginLeft:3}} 
                              onClick={()=>{
                              handleOpen();
                              handleDelete(row.id, row.job_title);
                              }} 
                              />
                        </StyledTableCell>
                        </StyledTableRow>
                    )})}
                    </TableBody>
                </Table>
            </TableContainer>
            
          <Popup title={viewJob.job_title? viewJob.job_title: 'JOB'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <JobViewTable viewJob={viewJob} />
            </Popup>
            {jobStatus === 'delete' ?
            <ModalSample open={open} handleClose={handleClose} neededFunction={deleteJob} neededStatus={jobStatus} userId={jobid} userName={jobName} />
            :
            <ModalSample open={open} handleClose={handleClose} neededFunction={blockJob} neededStatus={jobStatus} userId={jobid} userName={jobName} />
            }
          </Container>
                <Copyright sx={{ mt: 5, mb:3 }} />
        </Box>
        </Box>
     </div>
   );
 }
 
 export default ViewPosts;
 