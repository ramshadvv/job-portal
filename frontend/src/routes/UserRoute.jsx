import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../components/user/HomePage'
import SignUp from '../components/user/SignUp'
import EducationSignUp from '../components/user/EducationSignUp'
import EditEducation from '../components/user/EditEducation'
import ExperienceSignup from '../components/user/ExperienceSignup'
import EditExperience from '../components/user/EditExperience'
import SkillsSignup from '../components/user/SkillsSignup'
import EditSkill from '../components/user/EditSkill'
import Profile from '../components/user/Profile'
import EditProfile from '../components/user/EditProfile'
import BioSignup from '../components/user/BioSignup'
import EditBio from '../components/user/EditBio'

function UserRoute() {
  return (
    <div>
        <Routes>
            <Route path='/'>
                <Route element={<HomePage />} path='home' />
                <Route element={<SignUp />} path='signup' />
                <Route element={<EducationSignUp />} path='educationsignup' />
                <Route element={<EditEducation/>} path='editeducation/:id' />
                <Route element={<ExperienceSignup />} path='experiencesignup' />
                <Route element={<EditExperience />} path='editexperience/:id' />
                <Route element={<SkillsSignup />} path='skillsignup' />
                <Route element={<EditSkill />} path='editskill/:id' />
                <Route element={<Profile />} path='profile' />
                <Route element={<EditProfile />} path='editprofile' />
                <Route element={<BioSignup />} path='biosignup' />
                <Route element={<EditBio />} path='editbio' />
            </Route>
        </Routes>
      
    </div>
  );
}

export default UserRoute;




