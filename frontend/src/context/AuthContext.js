import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../context/BaseUrl'
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import axios from 'axios'   
import Spinner from "../utils/Spinner";


const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children})=> {
    const token = JSON.parse(localStorage.getItem('authToken'));
    const ownertoken = JSON.parse(localStorage.getItem('ownerToken'));
    const stafftoken = JSON.parse(localStorage.getItem('staffToken'));
    const admintoken = JSON.parse(localStorage.getItem('adminToken'));

    let [authToken,setAuthToken] = useState(token?.access)
    let [adminToken,setAdminToken] = useState(admintoken?.access)
    let [ownerToken,setOwnerToken] = useState(ownertoken?.access)
    let [staffToken,setStaffToken] = useState(stafftoken?.access)
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('authToken')))
    let [admin, setAdmin] = useState()
    let [owner, setOwner] = useState()
    let [staff, setStaff] = useState()
    let [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    let loginUser = async(e)=>{
        e.preventDefault()
        setLoading(true)

        let response = await fetch(BaseUrl+'/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})

        })
        
        if(response.status == 200){
            let data = await response.json()
            let values = jwt_decode(data.access)

            if (values.email === 'admin@gmail.com' || values.is_owner === true || values.is_staff === true){
                Swal.fire({
                    text:'Invalid Credentials!!',
                    icon:'error'
                })
                setLoading(false)
            }else{
                if(response.status === 200){
                    setAuthToken(data.access)
                    localStorage.setItem('authToken', JSON.stringify(data))
                    await fetchUserDetails(data.access)
                    setLoading(false)
                    navigate('/home')
        
                }else{
                    setLoading(false)
                    console.log('failed')
                    Swal.fire({
                        text:'Invalid Credentials!!',
                        icon:'error'
                    })
                }
            }
        }else{
            setLoading(false)
            console.log('failed')
            Swal.fire({
                text:'Invalid Credentials!!',
                icon:'error'
            })
        }   


        
    };
    // let updateToken = async() => {
    //     console.log('Update Token Called')
    //     let response = await fetch(BaseUrl+'/api/token/refresh/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({'refresh':authToken?.refresh})
    //     })
    //     let data = await response.json()

    //     if (response.status === 200){
    //         setAuthToken(data.access)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authToken', JSON.stringify(data))
    //     }else{
    //         logoutUser()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/')
    }

    const loginAdmin = async (e) => {
        e.preventDefault();
        if(e.target.email.value !==  'admin@gmail.com'){
            Swal.fire({
                text:'Only admin can access!!',
                icon:'error'
            })
            return navigate('/admin')
        }
        const response = await fetch(BaseUrl+"/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setAdminToken(data.access);
          setAdmin(jwt_decode(data.access));
          localStorage.setItem("adminToken", JSON.stringify(data));
          navigate('/admin/home');
        
      };
    }

    let logoutAdmin = () => {
        setAdminToken(null)
        setAdmin(null)
        localStorage.removeItem('adminToken')
        navigate('/admin')
    }

    // let updateAdminToken = async() => {
    //     console.log('Update Toked Called')
    //     let response = await fetch(BaseUrl+'/api/token/refresh/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({'refresh':adminToken?.refresh})
    //     })
    //     let data = await response.json()

    //     if (response.status === 200){
    //         setAdminToken(data)
    //         setAdmin(jwt_decode(data.access))
    //         localStorage.setItem('adminToken', JSON.stringify(data))
    //     }else{
    //         logoutAdmin()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }

    let loginOwner = async(e)=>{
        e.preventDefault()
        setLoading(true)

        let response = await fetch(BaseUrl+'/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})

        })
        setLoading(false)
        
        if(response.status == 200){
            let data = await response.json()
            let values = jwt_decode(data.access)

            if (values.is_owner !== true){
                Swal.fire({
                    text:'Invalid Credentials!!',
                    icon:'error'
                })
            }else{
                if(response.status === 200){
                    setOwnerToken(data.access)
                    localStorage.setItem('ownerToken', JSON.stringify(data))
                    fetchOwnerDetails(data.access)
                    navigate('/owner/home')
        
                }else{
                    console.log('failed')
                    Swal.fire({
                        text:'Invalid Credentials!!',
                        icon:'error'
                    })
                }
            }
        }else{
            Swal.fire({
                text:'Invalid Credentials!!',
                icon:'error'
            })
        }
    };

    let logoutOwner = () => {
        setOwnerToken(null)
        setOwner(null)
        localStorage.removeItem('ownerToken')
        navigate('/owner')
    }

    let loginStaff = async(e)=>{
        e.preventDefault()
        setLoading(true)

        let response = await fetch(BaseUrl+'/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})

        })
        setLoading(false)
        
        if(response.status == 200){
            let data = await response.json()
            let values = jwt_decode(data.access)

            if (values.is_staff !== true){
                Swal.fire({
                    text:'Invalid Credentials!!',
                    icon:'error'
                })
            }else{
                if(response.status === 200){
                    setStaffToken(data.access)
                    localStorage.setItem('staffToken', JSON.stringify(data))
                    fetchStaffDetails(data.access)
                    navigate('/staff/home')
        
                }else{
                    console.log('failed')
                    Swal.fire({
                        text:'Invalid Credentials!!',
                        icon:'error'
                    })
                }
            }
        }else{
            Swal.fire({
                text:'Invalid Credentials!!',
                icon:'error'
            })
        }
    };

    let logoutStaff = () => {
        setStaffToken(null)
        setStaff(null)
        localStorage.removeItem('staffToken')
        navigate('/staff')
    }

    
    const fetchUserDetails=async(authToken)=>{
        setLoading(true)
        const result = await axios.get(`${BaseUrl}/profile/`, { headers: {"Authorization" : `Bearer ${authToken}`} })
        setUser(result.data)
        setLoading(false)

    }
    const fetchOwnerDetails=async(ownerToken)=>{
        const result = await axios.get(`${BaseUrl}/profile/`, { headers: {"Authorization" : `Bearer ${ownerToken}`} })
        setOwner(result.data)

    }
    const fetchStaffDetails=async(staffToken)=>{
        const result = await axios.get(`${BaseUrl}/profile/`, { headers: {"Authorization" : `Bearer ${staffToken}`} })
        setStaff(result.data)

    }
    const fetchAdminDetails=async(adminToken)=>{
        const result = await axios.get(`${BaseUrl}/profile/`, { headers: {"Authorization" : `Bearer ${adminToken}`} })
        setAdmin(result.data)

    }
    

    useEffect(()=> {
        setLoading(true)
        let token = JSON.parse(localStorage.getItem('authToken'));
        let ownertoken = JSON.parse(localStorage.getItem('ownerToken'));
        let stafftoken = JSON.parse(localStorage.getItem('staffToken'));
        let admintoken = JSON.parse(localStorage.getItem('adminToken'));
        if(token){
            if(authToken){
                fetchUserDetails(authToken)
            }else{
                setAuthToken(token.access) 
            }

        }
        if(admintoken){
            if(adminToken){
                fetchAdminDetails(adminToken)
            }else{
                setAdminToken(admintoken.access) 
            }

        }
        if(ownertoken){
            if(ownerToken){
                fetchOwnerDetails(ownerToken)
            }else{
                setOwnerToken(ownertoken.access) 
            }

        }
        if(stafftoken){
            if(staffToken){
                fetchStaffDetails(staffToken)
            }else{
                setStaffToken(stafftoken.access)
            }

        }
        setLoading(false)
        // let fourMinutes = 1000 * 60 * 4
        // let interval = setInterval(()=> {
        //     console.log('helllooo');
        //     if(authToken){
        //         updateToken()
        //      }
        //  }, fourMinutes)
        //  return ()=> clearInterval(interval)
 
     }, [])


     if(loading){
        return <Spinner />
    }

    let contextData = {
        user:user,
        admin:admin,
        owner:owner,
        staff:staff,
        authToken:authToken,
        adminToken:adminToken,
        ownerToken:ownerToken,
        staffToken:staffToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        loginOwner:loginOwner,
        logoutOwner:logoutOwner,
        loginStaff:loginStaff,
        logoutStaff:logoutStaff,
    };
 
     return (
         <AuthContext.Provider value={contextData}>
            {children}
         </AuthContext.Provider>
     );
    
};