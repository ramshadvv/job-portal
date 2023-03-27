import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

import {useContext} from 'react';
import AuthContext from '../../../context/AuthContext'

export const MainListItems = () =>{
    const {logoutStaff} = useContext(AuthContext)
    const navigate = useNavigate()
    
    const toDashboard = () =>{
      navigate('/staff/home')
    }
    const toUserList = () =>{
      navigate('/staff/userlist')
    }
    const toJobsList = () =>{
      navigate('/staff/jobs')
    }
    return(
    <React.Fragment>
        <ListItemButton  onClick={toDashboard}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton  onClick={toUserList}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton  onClick={toJobsList}>
        <ListItemIcon>
            <FolderCopyIcon />
        </ListItemIcon>
        <ListItemText primary="Jobs" />
        </ListItemButton>
        {/* <ListItemButton>
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        </ListItemButton> */}
        <ListItemButton onClick={logoutStaff}>
        <ListItemIcon>
            <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
        </ListItemButton>
    </React.Fragment>
)};

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);