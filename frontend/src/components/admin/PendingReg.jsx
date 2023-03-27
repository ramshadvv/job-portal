import React from 'react';
import AdminDashboard from './AdminDashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Copyright } from './AdminDashboard';

import DeleteIcon from '@mui/icons-material/Delete';
// import BlockIcon from '@mui/icons-material/Block';
// import Grid from '@mui/material/Grid';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../context/BaseUrl';
// import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2'
import AuthContext from '../../context/AuthContext';
import Spinner from '../../utils/Spinner';
import UserStatusDialogue from "./utils/UserStatusDialogue";

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

function PendingList() {
    const {adminToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userid, setUserId] = useState('')
    const [userName, setUserName] = useState()
    const [userStatus, setUserStatus] = useState()
    const [check, setCheck] = useState(false);
  
    const handleCheckOpen = (id) => {
      setUserId(id)
      setCheck(true);
    };
  
    const handleCheckClose = () => {
      setCheck(false);
    };

    const fetchOwnerList = async(adminToken) =>{
      console.log('-----------------------');
      setLoading(true)
      await axios.get(BaseUrl+'/ownerspending', {
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer  ${adminToken}`
          }
      }).then((response) =>{
          setLoading(false)
          if(response.status === 200){
              setRows(response.data)
          }
      }).catch((err)=>{
          setRows([])
          setLoading(false)

      })
    }

  const deleteOwner = async(id) => {
    setLoading(true)
    await axios.delete(`${BaseUrl}/deleteuser/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      fetchOwnerList(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  const approveOwner = async(id) => {
    setLoading(true)
    await axios.get(`${BaseUrl}/approve/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      console.log('deleted')
      fetchOwnerList(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  useEffect(()=> {
    fetchOwnerList(adminToken)
  }, [])

  const handleDelete=(id, name)=>{
    setUserStatus('Delete')
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
              PENDING REQUESTS
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
                        <StyledTableCell align="center">View Status</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { rows.length != 0?
                    rows.map((row, index) => {
                      return(
                        <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            {/* {index+1} */}
                            {row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                            {row.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                        <StyledTableCell align="center">{row.phone}</StyledTableCell>
                        <StyledTableCell align="center">
                              <Button variant="outlined" onClick={()=>{
                                handleCheckOpen(row.id);
                                }}>
                                View
                              </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                              {/* <BlockIcon sx={{color:'#4f4fde', cursor:'pointer'}} onClick={()=>{
                              handleOpen();
                              handleApprove(row.id, row.username);
                              }} /> */}
                            <DeleteIcon sx={{color:'#ef5a5a', cursor:'pointer',marginLeft:3, marginTop:2}} onClick={()=>{
                              handleOpen();
                              handleDelete(row.id, row.username);
                              }} />
                        </StyledTableCell>
                        </StyledTableRow>
                    )}) :
                    <StyledTableRow>
                    <Typography align='center'>No pending requests available</Typography>
                    </StyledTableRow>
                    }
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
                                  userStatus === 'Delete'?
                                  <Button variant="outlined" sx={{color:'blue', marginLeft:'10px'}} onClick={()=>{
                                    deleteOwner(userid);
                                    handleClose();
                                  }}>Confirm</Button>
                                  :
                                  <Button variant="outlined" sx={{color:'blue', marginLeft:'10px'}} onClick={()=>{
                                    approveOwner(userid);
                                    handleClose();
                                  }}>Confirm</Button>

                                }
                              </Box>
                            </Box>
                          </Modal>
                </Table>
            </TableContainer>
            {check && <UserStatusDialogue handleClose={handleCheckClose}  open={check} userId={userid} listOwners={fetchOwnerList} />}
          </Container>
                <Copyright sx={{ mt: 5, mb:3 }} />
        </Box>
        </Box>
     </div>
   );
 }
 
 export default PendingList;
 