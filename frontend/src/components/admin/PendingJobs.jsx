import React from 'react';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { Copyright } from './AdminDashboard';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';

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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const {adminToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [jobid, setJobId] = useState()
    const [jobName, setJobName] = useState()
    const [jobStatus, setJobStatus] = useState()
    const [openSnack, setSnackOpen] = useState(false);

    const handleSnackClick = () => {
        setSnackOpen(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setSnackOpen(false);
    };

    const fetchJobList = async(adminToken) =>{
      setLoading(true)
      await axios.get(BaseUrl+'/pendingjobs', {
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer  ${adminToken}`
          }
      }).then((response) =>{
          setLoading(false)
          if(response.status === 200){
              setRows(response.data)
              console.log(response.data)
          }
      }).catch((err)=>{
        console.log(err);
          setRows([])
          setLoading(false)

      })
  }

  const approveJob = async(id) => {
    setLoading(true)
    await axios.get(`${BaseUrl}/approvejob/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('approved')
      fetchJobList(adminToken)
      handleSnackClick()
    }).catch((err)=>{
        setLoading(false)

    })
  }

  const deleteJob = async(id) => {
    setLoading(true)
    await axios.delete(`${BaseUrl}/deletejob/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      handleSnackClick()
      fetchJobList(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  useEffect(()=> {
    fetchJobList(adminToken)
  }, [])

  const handleDelete=(id, name)=>{
    setJobStatus('delete')
    setJobId(id)
    setJobName(name)
  }

  const handleApprove=(id, title, active)=>{
    setJobStatus('Approve')
    setJobId(id)
    setJobName(`${title} Job`)
  }

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
            width:'100%'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight:'77vh' }}>
            <Typography variant="h5" sx={{fontWeight:'bold', textAlign:'center', marginBottom:'2rem'}} component="h1">
              JOBS
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">Company</StyledTableCell>
                        <StyledTableCell align="center">Salary</StyledTableCell>
                        <StyledTableCell align="center">Expired date</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.length !== 0 ?  rows.map((row, index) => {
                      return(
                        <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            {index+1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.job_title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.job_company}</StyledTableCell>
                        <StyledTableCell align="center">{row.job_salary}</StyledTableCell>
                        <StyledTableCell align="center">{row.job_expired}</StyledTableCell>
                        <StyledTableCell align="right">
                              <Button sx={{color:'green', cursor:'pointer'}} 
                              onClick={()=>{
                              handleOpen();
                              handleApprove(row.id, row.job_title);
                              }}
                              >APPROVE</Button>
                            <DeleteIcon sx={{color:'#ef5a5a', cursor:'pointer',marginLeft:3}} 
                              onClick={()=>{
                              handleOpen();
                              handleDelete(row.id, row.job_title);
                              }} 
                              />
                        </StyledTableCell>
                        </StyledTableRow>
                    )})
                    :
                    <StyledTableCell component="th" scope="row">
                        {'No pending jobs are available!!'}
                    </StyledTableCell>
                  
                  }
                    </TableBody>
                </Table>
            </TableContainer>
            {jobStatus === 'delete'?
            <ModalSample open={open} handleClose={handleClose} neededFunction={deleteJob} neededStatus={jobStatus} userId={jobid} userName={jobName} />
            :
            <ModalSample open={open} handleClose={handleClose} neededFunction={approveJob} neededStatus={jobStatus} userId={jobid} userName={jobName} />
            }
          </Container>
                <Copyright sx={{ mt: 5, mb:3 }} />
        </Box>
          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={jobStatus === 'delete'? "error" : 'success'} sx={{ width: '100%' }}>
            {jobStatus === 'delete'? 'Job is successfully deleted!!':'Job is successfully Approved!!'}
            </Alert>
          </Snackbar>
        </Box>
     </div>
   );
 }
 
 export default ViewPosts;
 