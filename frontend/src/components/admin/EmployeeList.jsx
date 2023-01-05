import React from 'react';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Copyright } from './AdminDashboard';

import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
// import Grid from '@mui/material/Grid';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2'
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
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
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

function EmployeeList() {
    const {adminToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userid, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [userStatus, setUserStatus] = useState()
    console.log(adminToken);

    const fetchStaffList = async(adminToken) =>{
      setLoading(true)
      await axios.get(BaseUrl+'/employees', {
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
          setRows([])
          setLoading(false)

      })
  }

  const deleteStaff = async(id) => {
    setLoading(true)
    await axios.delete(`${BaseUrl}/deleteuser/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      fetchStaffList(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  const blockStaff = async(id) => {
    setLoading(true)
    await axios.get(`${BaseUrl}/blockuser/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      fetchStaffList(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  useEffect(()=> {
    fetchStaffList(adminToken)
  }, [])

  const handleDelete=(id, name)=>{
    setUserStatus('delete')
    setUserId(id)
    setUserName(name)
  }

  const handleBlock=(id, name, active)=>{
    if(active === true)
    setUserStatus('block')
    else
    setUserStatus('Unblock')
    setUserId(id)
    setUserName(name)
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
              EMPLOYEES
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">Company ID</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
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
                            {row.first_name+'  '+row.last_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.company_id}</StyledTableCell>
                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                        <StyledTableCell align="center">{row.phone}</StyledTableCell>
                        <StyledTableCell align="right">
                            {
                              row.is_active === false?
                              <BlockIcon sx={{color:'#4f4fde', cursor:'pointer'}} onClick={()=>{
                              handleOpen();
                              handleBlock(row.id, row.username, row.is_active);
                              }} />
                              :
                              <Button sx={{color:'green', cursor:'pointer'}} onClick={()=>{
                              handleOpen();
                              handleBlock(row.id, row.username, row.is_active);
                              }}>ACTIVE</Button>
                            }
                            <DeleteIcon sx={{color:'#ef5a5a', cursor:'pointer',marginLeft:3, marginTop:2}} onClick={()=>{
                              handleOpen();
                              handleDelete(row.id, row.username);
                              }} />
                        </StyledTableCell>
                        </StyledTableRow>
                    )})}
                    </TableBody>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h5" component="h2">
                                Confirmation
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft:'5px' }}>
                                Do you want to {userStatus === 'delete'? 'Delete' : userStatus }  <span style={{fontWeight:'bold'}}>{userName} !!</span>
                              </Typography>
                              <Box sx={{ mt: 2, display:'flex', justifyContent:'right' }}>
                                <Button variant="outlined"  color="error" sx={{color:'red'}} onClick={handleClose}>Close</Button>
                                { 
                                  userStatus === 'delete'?
                                  <Button variant="outlined" sx={{color:'blue', marginLeft:'10px'}} onClick={()=>{
                                    deleteStaff(userid);
                                    handleClose();
                                  }}>Confirm</Button>
                                  :
                                  <Button variant="outlined" sx={{color:'blue', marginLeft:'10px'}} onClick={()=>{
                                    blockStaff(userid);
                                    handleClose();
                                  }}>Confirm</Button>

                                }
                              </Box>
                            </Box>
                          </Modal>
                </Table>
            </TableContainer>
          </Container>
                <Copyright sx={{ mt: 5, mb:3 }} />
        </Box>
        </Box>
     </div>
   );
 }
 
 export default EmployeeList;
 