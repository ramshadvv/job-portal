import './App.css';
import {AuthProvider} from './context/AuthContext'
import { Route, Routes} from 'react-router-dom'

import LoginPage from './components/user/LoginPage'
import HomePage from './components/user/HomePage'
import SignUp from './components/user/SignUp'
import EducationSignUp from './components/user/EducationSignUp'
import EditEducation from './components/user/EditEducation'
import ExperienceSignup from './components/user/ExperienceSignup'
import EditExperience from './components/user/EditExperience'
import SkillsSignup from './components/user/SkillsSignup'
import EditSkill from './components/user/EditSkill'
import Profile from './components/user/Profile'
import EditProfile from './components/user/EditProfile'
import BioSignup from './components/user/BioSignup'
import EditBio from './components/user/EditBio'
import Test from './components/user/Test'

import AdminLoginPage  from './components/admin/AdminLoginPage'
import AdminHomePage  from './components/admin/AdminHomePage'
import CompanyList  from './components/admin/CompanyList'
import EmployeeList from './components/admin/EmployeeList';

import OwnerLoginPage  from './components/owner/OwnerLoginPage'
import OwnerHomePage  from './components/owner/OwnerHomePage'
import OwnerSignUp  from './components/owner/OwnerSignUp'
import StaffList  from './components/owner/StaffList'
import CompanySignup from './components/owner/CompanySignup';
import OwnerProfile from './components/owner/OwnerProfile';

import StaffLoginPage  from './components/staff/StaffLoginPage'
import StaffHomePage  from './components/staff/StaffHomePage'
import StaffSignUp  from './components/staff/StaffSignUp'
import UsersList from './components/staff/UsersList';
import CompanyVerify from './components/staff/CompanyVerify';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes>
            {/* admin routers */}
            
            <Route element={<AdminLoginPage />} path='/admin' />
            <Route element={<AdminHomePage />} path='/admin/home' />
            <Route element={<CompanyList />} path='/admin/companies' />
            <Route element={<EmployeeList />} path='/admin/employees' />

            {/* user routers */}

            <Route element={<LoginPage />} path='/' exact />
            <Route element={<HomePage />} path='/home' />
            <Route element={<SignUp />} path='/signup' />
            <Route element={<EducationSignUp />} path='/educationsignup' />
            <Route element={<EditEducation/>} path='/editeducation/:id' />
            <Route element={<ExperienceSignup />} path='/experiencesignup' />
            <Route element={<EditExperience />} path='/editexperience/:id' />
            <Route element={<SkillsSignup />} path='/skillsignup' />
            <Route element={<EditSkill />} path='/editskill/:id' />
            <Route element={<Profile />} path='/profile' />
            <Route element={<EditProfile />} path='/editprofile' />
            <Route element={<BioSignup />} path='/biosignup' />
            <Route element={<EditBio />} path='/editbio' />
            <Route element={<Test />} path='/test' />

            {/* owner routers */}

            <Route element={<OwnerLoginPage />} path='/owner' />
            <Route element={<OwnerHomePage />} path='/owner/home' />
            <Route element={<OwnerSignUp />} path='/owner/signup' />
            <Route element={<CompanySignup />} path='/owner/addcompany' />
            <Route element={<StaffList />} path='/owner/staffs' />
            <Route element={<OwnerProfile />} path='/owner/profile' />

            {/* staff routers */}

            <Route element={<StaffLoginPage />} path='/staff' />
            <Route element={<StaffHomePage />} path='/staff/home' />
            <Route element={<StaffSignUp />} path='/staff/signup/:id' />
            <Route element={<CompanyVerify />} path='/staff/verify' />
            <Route element={<UsersList />} path='/staff/userlist' />

          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
