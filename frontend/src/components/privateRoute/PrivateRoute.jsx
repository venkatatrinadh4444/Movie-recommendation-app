import axios from 'axios'
import { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute=({children})=> {
    const [verification,setVerification]=useState({isLoading:true,isVerified:false})
    const fetchingProfile=()=> {
        const token=localStorage.getItem('token')
        axios.get(`https://yournextmovie.onrender.com/auth/profile`,{headers:{Authorization:`Bearer ${token}`}}).then(res=>setVerification({isLoading:false,isVerified:true})).catch(err=>setVerification({isLoading:false,isVerified:false}))
    }

    useEffect(()=> {
        fetchingProfile()
    },[])

    if(verification.isLoading) {
        return <div className='text-center text-secondary'>
            <h5>Verification is in progress...</h5>
        </div>
    }

    return verification.isVerified?children:<Navigate to="/"/>


}

export default PrivateRoute