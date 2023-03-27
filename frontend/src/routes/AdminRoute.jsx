import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminHomePage  from '../components/admin/AdminHomePage'
import CompanyList  from '../components/admin/CompanyList'
import EmployeeList from '../components/admin/EmployeeList';
import PendingReg from '../components/admin/PendingReg';
import UserStatusDialogue from '../components/admin/utils/UserStatusDialogue';
import PendingJobs from '../components/admin/PendingJobs';

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path='/'>
                <Route element={<AdminHomePage />} path='home' />
                <Route element={<CompanyList />} path='companies' />
                <Route element={<EmployeeList />} path='employees' />
                <Route element={<PendingReg />} path='pending' />
                <Route element={<UserStatusDialogue />} path='dialogue' />
                <Route element={<PendingJobs />} path='pendingjobs' />
            </Route>
        </Routes>
    </div>
  );
}

export default AdminRoute;
