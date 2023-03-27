import React from 'react';
import { Route, Routes } from 'react-router-dom';       

import OwnerHomePage  from '../components/owner/OwnerHomePage'
import OwnerSignUp  from '../components/owner/OwnerSignUp'
import StaffList  from '../components/owner/StaffList'
import CompanySignup from '../components/owner/CompanySignup';
import OwnerProfile from '../components/owner/OwnerProfile';
import StaffPendingReg from '../components/owner/StaffPendingReg';
import PlanSubscribe from '../components/owner/PlanSubscribe';
import OwnerViewPost from '../components/owner/OwnerViewPost';

function OwnerRoute() {
  return (
    <div>
        <Routes>
            <Route path='/'>
                <Route element={<OwnerHomePage />} path='home' />
                <Route element={<OwnerSignUp />} path='signup' />
                <Route element={<CompanySignup />} path='addcompany' />
                <Route element={<StaffList />} path='staffs' />
                <Route element={<OwnerProfile />} path='profile' />
                <Route element={<StaffPendingReg />} path='pending' />
                <Route element={<PlanSubscribe />} path='subscribeplan' />
                <Route element={<OwnerViewPost />} path='viewjobs' />
            </Route>
        </Routes>
      
    </div>
  );
}

export default OwnerRoute;
