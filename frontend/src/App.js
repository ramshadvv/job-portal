import './App.css';
import {AuthProvider} from './context/AuthContext'
import { Route, Routes} from 'react-router-dom'
import AddPic from './utils/AddPic'
import OtpVerify from './utils/OtpVerify'
import Test from './components/user/Test'

import LoginPage from './components/user/LoginPage'
import AdminLoginPage  from './components/admin/AdminLoginPage'
import OwnerLoginPage  from './components/owner/OwnerLoginPage'
import StaffLoginPage  from './components/staff/StaffLoginPage'

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import OwnerRoute from './routes/OwnerRoute';
import StaffRoute from './routes/StaffRoute';
import NewSample from './routes/NewSample';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes>
            {/* admin routers */}
            
            <Route element={<AdminLoginPage />} path='/admin' />
            <Route element={<AdminRoute />} path='/admin/*' />
            <Route element={<AddPic />} path='/addpic' />
            <Route element={<OtpVerify />} path='/admin/otp' />
            <Route element={<NewSample />} path='/new' />

            {/* user routers */}

            <Route element={<LoginPage />} path='/' exact />
            <Route element={<UserRoute />} path='/*'  />
            <Route element={<Test />} path='/test' />

            {/* owner routers */}

            <Route element={<OwnerLoginPage />} path='/owner' />
            <Route element={<OwnerRoute />} path='/owner/*' />
            
            {/* staff routers */}

            <Route element={<StaffLoginPage />} path='/staff' />
            <Route element={<StaffRoute />} path='/staff/*' />

          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;