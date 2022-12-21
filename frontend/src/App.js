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
import AdminDashboard  from './components/admin/AdminDashboard'

import OwnerLoginPage  from './components/owner/OwnerLoginPage'
import OwnerDashboard  from './components/owner/OwnerDashboard'
import OwnerSignUp  from './components/owner/OwnerSignUp'

import StaffLoginPage  from './components/staff/StaffLoginPage'
import StaffDashboard  from './components/staff/StaffDashboard'
import StaffSignUp  from './components/staff/StaffSignUp'

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes>
            {/* admin routers */}
            
            <Route element={<AdminLoginPage />} path='/admin' />
            <Route element={<AdminDashboard />} path='/admin/home' />

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
            <Route element={<OwnerDashboard />} path='/owner/home' />
            <Route element={<OwnerSignUp />} path='/owner/signup' />

            {/* staff routers */}

            <Route element={<StaffLoginPage />} path='/staff' />
            <Route element={<StaffDashboard />} path='/staff/home' />
            <Route element={<StaffSignUp />} path='/staff/signup' />

          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
