import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import BusinessIcon from '@mui/icons-material/Business';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

import {useContext} from 'react';
import AuthContext from '../../../context/AuthContext'
import PendingIcon from '@mui/icons-material/Pending';

export const MainListItems = () =>{
    const {logoutAdmin} = useContext(AuthContext)
    const navigate = useNavigate()
    
    const toDashboard = () =>{
      navigate('/admin/home')
    }
    const toPendingList = () =>{
      navigate('/admin/pending')
    }
    const toCompanies = () =>{
      navigate('/admin/companies')
    }
    const toEmployee = () =>{
      navigate('/admin/employees')
    }
    const toPendingJobs = () =>{
      navigate('/admin/pendingjobs')
    }
    return(
    <React.Fragment>
        <ListItemButton onClick={toDashboard}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* <ListItemButton>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Owners" />
        </ListItemButton> */}
        <ListItemButton onClick={toPendingList}>
        <ListItemIcon>
            <PendingIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Registration" />
        </ListItemButton>
        <ListItemButton onClick={toPendingJobs}>
        <ListItemIcon>
            <PendingIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Jobs" />
        </ListItemButton>
        <ListItemButton onClick={toCompanies}>
        <ListItemIcon>
            <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Companies" />
        </ListItemButton>
        <ListItemButton onClick={toEmployee}>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employers" />
        </ListItemButton>
        {/* <ListItemButton>
        <ListItemIcon>
            <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        </ListItemButton> */}
        <ListItemButton onClick={logoutAdmin}>
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