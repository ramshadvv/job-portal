import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

function ViewJob(props) {
    const { viewJob, setOpenPopup, setformOpenPopup } = props;
    var ressplit            = viewJob.job_respon.trim().split(".").filter(item=>item)
    var qualisplit          = viewJob.job_qualif.trim().split(".").filter(item=>item)
    var job_typesplit       = viewJob.job_type.trim().split(".").filter(item=>item)
    var job_requirsplit     = viewJob.job_requir.trim().split(".").filter(item=>item)
    var job_sechedulesplit  = viewJob.job_sechedule.trim().split(".").filter(item=>item)
    var job_educationsplit  = viewJob.job_education.trim().split(".").filter(item=>item)
    var job_experiencesplit = viewJob.job_experience.trim().split(".").filter(item=>item)
      // const [status, setStatus]= useState('')

    // const [openformPopup, setformOpenPopup] = useState(false);
    // const [viewJob,setViewJob]=useState({})
  
      // const { token } = useSelector((state) => state.userAuth);
      
      //change the task status 
      // const changeStatus=async(e)=>{
      //     console.log(e.target.value);
      // viewJob.task_status=e.target.value
      //     setStatus(e.target.value)
      //     const response = await taskService.changeTaskStatus(token,e.target.value,viewJob._id)
       
      // }
    const handleOldpopup = () =>{
      setOpenPopup(false)
      setformOpenPopup(true)
    }
    // const handlePopupOpen =()=>{
    // }
  
    return (
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 550 }}>
            <TableBody>
              <TableRow key={viewJob.id}>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell>{viewJob.job_title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Salary</TableCell>
                <TableCell>{viewJob.job_salary + ' - ' + viewJob.job_salaryto}</TableCell>
              </TableRow>
              { job_typesplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{ fontWeight: 700 }}>Job Type</span>
                {
                    job_typesplit.map((item)=>{
                        return(
                            <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }
                </TableCell>
              </TableRow>
              : ''  }
              { qualisplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{ fontWeight: 700 }}>Qualification</span>
                  {  qualisplit.map((item)=>{
                        return(
                            <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                  }
                </TableCell>
              </TableRow>
              : ''  }
              <TableRow>
                <TableCell colSpan={2}><span style={{ fontWeight: 700 }}>Job Description</span>
                <p>{viewJob.job_descri}</p></TableCell>
              </TableRow>
              { ressplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{fontWeight: 700}}>Responsibilities</span> 
                
                {
                    ressplit.map((item)=>{
                        return(
                             <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }</TableCell>
              </TableRow>
              : ''  }
              { job_requirsplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{fontWeight: 700}}>Requirements</span> 
                
                {
                    job_requirsplit.map((item)=>{
                        return(
                             <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }</TableCell>
              </TableRow>
              : ''  }
              { job_sechedulesplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{fontWeight: 700}}>Schedule</span> 
                
                {
                    job_sechedulesplit.map((item)=>{
                        return(
                             <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }</TableCell>
              </TableRow>
              : ''  }
              { job_educationsplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{fontWeight: 700}}>Education</span> 
                
                {
                    job_educationsplit.map((item)=>{
                        return(
                             <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }</TableCell>
              </TableRow>
              : ''  }
              { job_experiencesplit.length !== 0 ?
              <TableRow>
                <TableCell colSpan={2}><span style={{fontWeight: 700}}>Experience</span> 
                
                {
                    job_experiencesplit.map((item)=>{
                        return(
                             <List sx={{marginLeft:'1rem'}}>
                            <ListItem disablePadding sx={{ display: 'list-item',listStyleType: 'disc' }}>
                                {item}
                            </ListItem>
        
                        </List> 
                    )})
                }</TableCell>
              </TableRow>
              : ''  }
            </TableBody>
          </Table>
        </TableContainer>
        <Box display={'flex'} justifyContent={'right'} sx={{padding:'1rem'}}>

        <Button size="small"  onClick={()=>{
          handleOldpopup();
        }}>Apply</Button>
        </Box>
      </Box>
    );
  }
  

export default ViewJob;
