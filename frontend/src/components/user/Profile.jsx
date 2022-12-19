import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import NavBar from './NavBar';
import {useEffect,useContext, useState} from "react";
import BaseUrl from '../../context/BaseUrl'
import AuthContext from '../../context/AuthContext';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from "../../utils/Spinner";
import {  } from 'react-router-dom';

function Profile() {
    const [educ, setEduc] = useState([])
    const [exp, setExp] = useState([])
    const [skill, setSkill] = useState([])
    const [res, setRes] = useState([])
    const [loading, setLoading] = useState(false)
    const {authToken, user} = useContext(AuthContext)
    const navigate = useNavigate()

    const fetchEducation = async(authToken) =>{
        setLoading(true)
        await Axios.get(BaseUrl+'/education', {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            setLoading(false)
            if(response.status === 200){
                setEduc(response.data)
            }
        }).catch((err)=>{
            setEduc([])
            setLoading(false)

        })
    }

    const fetchExperience = async(authToken) =>{
        setLoading(true)
        await Axios.get(BaseUrl+'/experience', {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            setLoading(false)
            if(response.status === 200){
                setExp(response.data)
            }
        }).catch((err)=>{
            setExp([])
            setLoading(false)

        })
    }

    const fetchSkill = async(authToken) =>{
        setLoading(true)
        await Axios.get(BaseUrl+'/skill', {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            setLoading(false)
            console.log(response.data) 
            if(response.status === 200){
                setSkill(response.data)
            }
        }).catch((err)=>{
            setSkill([])
            setLoading(false)

        })
    }

    const fetchResume = async(authToken) =>{
        setLoading(true)
        await Axios.get(BaseUrl+'/bio', {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            setLoading(false)
            console.log(response.data) 
            if(response.status === 200){
                setRes(response.data)
            }
        }).catch((err)=>{
            setRes([])
            setLoading(false)

        })
    }

    const deleteEducation = async(id) => {
        await Axios.delete(`${BaseUrl}/deleteeducation/${id}`, {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            fetchEducation(authToken)
            console.log('deleted')
            
        }).catch((err)=>{
            setLoading(false)

        })
    }

    const deleteExperience= async(id) => {
        await Axios.delete(`${BaseUrl}/deleteexperience/${id}`, {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            fetchExperience(authToken)
            console.log('deleted')
            
        }).catch((err)=>{
            setLoading(false)

        })
    }

    const deleteSkill = async(id) => {
        await Axios.delete(`${BaseUrl}/deleteskill/${id}`, {
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${authToken}`
            }
        }).then((response) =>{
            fetchSkill(authToken)
            console.log('deleted')
            
        }).catch((err)=>{
            setLoading(false)

        })
    }

    useEffect(()=> {
        fetchEducation(authToken)
        fetchExperience(authToken)
        fetchSkill(authToken)
        fetchResume(authToken)
    }, [authToken])
  
    const toAddEducation = () =>{
        navigate('/educationsignup')
    }
    const toAddExperience = () =>{
        navigate('/experiencesignup')
    }
    const toAddSkill = () =>{
        navigate('/skillsignup')
    }
    const toAddResume = () =>{
        navigate('/biosignup')
    }

    if(loading){
        return <Spinner />
    }

    return (
        <>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 300, marginLeft:'3rem', marginTop:'6rem' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Quick Links
                            </Typography>
                            <hr />
                            <List>
                                <ListItem>
                                <ListItemText
                                    primary="Resume"
                                />
                                {res.length === 0?<Button size="small" onClick={toAddResume}>Add</Button>:''}
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary="Educations"
                                />
                                <Button size="small" onClick={toAddEducation}>Add</Button>
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary="Experience"
                                />
                                <Button size="small" onClick={toAddExperience}>Add</Button>
                                </ListItem>
                                <ListItem>
                                <ListItemText
                                    primary="Skills"
                                />
                                <Button size="small"  onClick={toAddSkill}>Add</Button>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sm={8} sx={{marginTop:'6rem'}}>
                    <Card id='education' sx={{ maxWidth: 900, marginLeft:'3rem' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Resume
                            {res.length !== 0?
                            <Button size="small" sx={{marginLeft:'41rem'}}>Edit</Button>:<Button size="small" sx={{marginLeft:'41rem'}} onClick={toAddResume}>Add</Button>}
                            </Typography>
                            <hr />
                            <List>
                                {res.length !== 0?
                                <>
                                    <ListItem>
                                    <ListItemText
                                        primary={user.username}
                                    />
                                        </ListItem>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            
                                            BIOGRAPHY : {res.biography}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem', marginTop:'1rem'}}>
                                            {res.resume}
                                        </Typography>
                                    </>
                                    :<ListItemText><Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                No data available
                            </Typography></ListItemText>}
                            </List>
                        </CardContent>
                    </Card>
                    <Card id='education' sx={{ maxWidth: 900, marginLeft:'3rem', marginTop:'3rem' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Educations
                            <Button size="small" sx={{marginLeft:'35rem'}} onClick={toAddEducation}>ADD EDUCATION</Button>
                            </Typography>
                            <hr />
                            {/* <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem'}}>
                                Select from this list
                            </Typography> */}
                            <List>
                                {educ.length !== 0 ? educ.map((value)=>{
                                    return(
                                        <>
                                        <ListItem key={value.id}>
                                        <ListItemText
                                            primary={value.course}
                                        />
                                        <Button size="small">Edit</Button>
                                        <Button size="small" onClick={()=>deleteEducation(value.id)}>Delete</Button>
                                        </ListItem>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.university}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.passout}
                                        </Typography>
                                        </>

                                    )
                                }):<ListItemText><Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                No data available
                            </Typography></ListItemText>}
                            </List>
                        </CardContent>
                    </Card>
                    <Card id='experience' sx={{ maxWidth: 900, marginLeft:'3rem', marginTop:'3rem'}}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Experience
                            <Button size="small" sx={{marginLeft:'35rem'}} onClick={toAddExperience}>ADD EXPERIENCE</Button>
                            </Typography>
                            <hr />
                            <List>
                                {exp.length !== 0?exp.map((value)=>{
                                    return(
                                        <>
                                        <ListItem key={value.id}>
                                        <ListItemText
                                            primary={value.companyname}
                                        />
                                        <Button size="small">Edit</Button>
                                        <Button size="small" onClick={()=>deleteExperience(value.id)}>Delete</Button>
                                        </ListItem>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.designation}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.exp_year + ' YEAR'}
                                        </Typography>
                                        </>

                                    )
                                }):
                                <ListItemText><Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                No data available
                            </Typography></ListItemText>}
                            </List>
                        </CardContent>
                    </Card>
                    <Card id='skill' sx={{ maxWidth: 900, marginLeft:'3rem', marginTop:'3rem'  }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Skills
                            <Button size="small" sx={{marginLeft:'41rem'}} onClick={toAddSkill}>ADD SKILLS</Button>
                            </Typography>
                            <hr />
                            <List>
                                {skill.length !== 0?skill.map((value)=>{
                                    return(
                                        <>
                                        <ListItem key={value.id}>
                                        <ListItemText
                                            primary={value.skill}
                                        />
                                        <Button size="small">Edit</Button>
                                        <Button size="small" onClick={()=>deleteSkill(value.id)}>Delete</Button>
                                        </ListItem>
                                        {/* <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.university}
                                        </Typography> */}
                                        <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {value.exp_year + ' YEAR'}
                                        </Typography>
                                        </>

                                    )
                                }):<ListItemText><Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                No data available
                            </Typography></ListItemText>}
                            </List>
                        </CardContent>
                    </Card>
                    <Card id='personal' sx={{ maxWidth: 900, marginLeft:'3rem', marginBottom:'5rem', marginTop:'3rem' }}>
                        <CardContent>
                            <Typography gutterBottom sx={{fontSize:'20px', fontWeight:700}} component="div">
                            Personal Details
                            <Button size="small" sx={{marginLeft:'36rem'}}>EDIT</Button>
                            </Typography>
                            <hr />
                            {/* <Typography variant="body2" color="text.secondary" sx={{marginTop:'2rem'}}>
                                Select from this list
                            </Typography> */}
                            <List>
                                <ListItem>
                                <ListItemText
                                    primary={user.first_name + ' ' + user.last_name}
                                />
                                </ListItem>
                                <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                    {user.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{marginLeft:'1rem', fontSize:'1rem'}}>
                                            {user.phone}
                                </Typography>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default Profile;
