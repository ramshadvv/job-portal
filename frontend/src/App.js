import './App.css';
import {AuthProvider} from './context/AuthContext'
import { Route, Routes} from 'react-router-dom'
import LoginPage from './components/user/LoginPage'
import HomePage from './components/user/HomePage'
import SignUp from './components/user/SignUp'
import EducationSignUp from './components/user/EducationSignUp'
import ExperienceSignup from './components/user/ExperienceSignup'
import SkillsSignup from './components/user/SkillsSignup'
import Profile from './components/user/Profile'
import BioSignup from './components/user/BioSignup'
import Test from './components/user/Test'

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes>
            {/* admin routers */}
            
            {/* <Route element={<AdminLoginPage />} path="/admin" /> */}

            {/* user routers */}

            <Route element={<LoginPage />} path='/' exact />
            <Route element={<HomePage />} path='/home' />
            <Route element={<SignUp />} path='/signup' />
            <Route element={<EducationSignUp />} path='/educationsignup' />
            <Route element={<ExperienceSignup />} path='/experiencesignup' />
            <Route element={<SkillsSignup />} path='/skillsignup' />
            <Route element={<Profile />} path='/profile' />
            <Route element={<BioSignup />} path='/biosignup' />
            <Route element={<Test />} path='/test' />

          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
