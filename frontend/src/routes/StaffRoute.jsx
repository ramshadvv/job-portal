import React from 'react';
import { Route, Routes } from 'react-router-dom';  

import StaffHomePage  from '../components/staff/StaffHomePage'
import StaffSignUp  from '../components/staff/StaffSignUp'
import UsersList from '../components/staff/UsersList';
import CompanyVerify from '../components/staff/CompanyVerify';
import ViewPosts from '../components/staff/ViewPosts';
import AddPost from '../components/staff/AddPost';
import StaffProfile from '../components/staff/StaffProfile';

function StaffRoute() {
  return (
    <div>
        <Routes>
            <Route path='/'>
                <Route element={<StaffHomePage />} path='home' />
                <Route element={<StaffSignUp />} path='signup/:id' />
                <Route element={<CompanyVerify />} path='verify' />
                <Route element={<UsersList />} path='userlist' />
                <Route element={<ViewPosts />} path='jobs' />
                <Route element={<AddPost />} path='addjob' />
                <Route element={<StaffProfile />} path='profile' />
            </Route>
        </Routes>
      
    </div>
  );
}

export default StaffRoute;
