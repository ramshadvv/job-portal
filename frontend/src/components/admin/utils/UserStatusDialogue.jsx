import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../../../context/BaseUrl';
// import {useNavigate} from 'react-router-dom';
// import Swal from 'sweetalert2'
import AuthContext from '../../../context/AuthContext';
import Spinner from '../../../utils/Spinner';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserStatusDialogue({open,handleClose, userId, listOwners}) {
  const {adminToken} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])

  const fetchPlanStatus = async(adminToken) =>{
    setLoading(true)
    await axios.get(`${BaseUrl}/getownerplanstatus/${userId}/`, {
        headers:{
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      console.log(response)
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

  const approveOwner = async(id) => {
    setLoading(true)
    await axios.get(`${BaseUrl}/approve/${id}/`, {
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer  ${adminToken}`
        }
    }).then((response) =>{
      setLoading(false)
      listOwners(adminToken)
    }).catch((err)=>{
        setLoading(false)

    })
  }

  useEffect(()=> {
    fetchPlanStatus(adminToken);
  }, [userId])

  if(loading){
    return <Spinner />
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{"USER STATUS"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {
            rows.length !== 0 ? 
            <div>
            <Typography component="h6" variant="h5">
            {"Company ID"}  <span style={{marginLeft:'4rem', marginRight:'2rem'}}>: </span>
            {rows.company.id}
          </Typography>
          <Typography component="h6" variant="h5">
            {"Company Name"}  <span style={{marginLeft:'24px', marginRight:'2rem'}}>: </span>
            {rows.company.cmp_name}
          </Typography>
          <Typography component="h6" variant="h5">
            {"Current Plan"} <span style={{marginLeft:'4rem', marginRight:'2rem'}}>: </span>
            {rows.plan}
          </Typography>
          </div>
           : 'Not registered'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:'red'}}>Close</Button>
        {
          rows.length !== 0 ? 
          <Button onClick={()=>{
            approveOwner(userId);
            handleClose();
            }}>Agree</Button>
            : ''}
        </DialogActions>
      </Dialog>
    </div>
  );
}
