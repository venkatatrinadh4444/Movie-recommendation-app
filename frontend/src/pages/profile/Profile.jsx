import starImg from "../../assets/star.jpg";
import './Profile.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import moment from 'moment'
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Navbar from '../../components/navabar/Navbar'

const Profile = () => {
  const [userProfile,setUserProfile]=useState({})
  const loginpage=useNavigate(null)
  const [fetchedMovies,setFetchedMovies]=useState([])
  const fetchingRecommendations=()=> {
    const token=localStorage.getItem('token')
    axios.get('https://movie-recommendation-app-6rw6.onrender.com/movies/your-recommendations',{headers:{Authorization:`Bearer ${token}`}}).then(res=>setFetchedMovies(res.data.
      yourRecommendedMovies)).catch(err=>console.log(err))
  }

  const fetchingProfileDetails=()=> {
    const token=localStorage.getItem('token')
    axios.get(`https://movie-recommendation-app-6rw6.onrender.com/auth/profile`,{headers:{Authorization:`Bearer ${token}`}}).then(res=>setUserProfile(res.data.exist)).catch(err=>console.log(err))
  }

  useEffect(()=> {
    fetchingRecommendations()
    fetchingProfileDetails()
  },[])

  const deleteMovie=(idValue)=> {
    const token=localStorage.getItem('token')
    axios.delete(`https://movie-recommendation-app-6rw6.onrender.com/movies/delete-your-recommendation/${idValue}`,{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
      setFetchedMovies(res.data.updatedMovies)
      toast.success(res.data.msg)
    }).catch(err=>toast.error(res.data.msg))
  }

  const logoutHandler=()=> {
    localStorage.removeItem('token')
    loginpage('/')
  }

  return (
    <>
    <Navbar/>
    <div className="d-md-flex gap-3 align-items-center">
      <div className="d-flex flex-column">
      <div className="d-flex gap-2 align-items-center shadow-lg m-2 rounded-2 p-2 mb-3 mt-3">
          <div>
            <img
              src={userProfile.profileImg}
              alt="profile"
              width="60px"
            />
          </div>
          <div>
            <h5 className="m-0">{userProfile.username}</h5>
            <p className="m-0">{userProfile.email}</p>
            <p className="m-0">Member Since : {moment(userProfile.createdAt).format('DD/MM/YYYY')}</p>
          </div>
        </div>
        <div className="mx-2">
          <button className="btn btn-danger form-control" onClick={logoutHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fillRule="currentColor"
              className="bi bi-box-arrow-right text-bg-danger"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
      <div>
        <h5 className="m-2">Your Recommendations</h5>
       {fetchedMovies.length>0?
       fetchedMovies.map(eachMovie=>{
        return  <div key={eachMovie._id}className="movieCardBox gap-2 d-flex align-items-center justify-content-between">
        <img
          src={eachMovie.image}
          alt="movieImage"
          width="90px" height="100px" className="rounded-1" style={{'objectFit':'cover'}}
        />
        <div className="eachMovieBox">
          <h6>{eachMovie.title}</h6>
          {[...Array(eachMovie.rating)].map((_,index)=><img src={starImg} alt="star" width="20px" key={index}/>)}
          <p>
            {eachMovie.description}
          </p>
          <p>{moment(eachMovie.createdAt).format("DD/MM/YYYY   h:mm:ss a")}</p>
        </div>
        <button className="btn" onClick={()=>deleteMovie(eachMovie._id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fillRule="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </div>
       }):<div className="m-2">Your are not recommended any movies yet.</div>}
      </div>
    </div>
    </>
  );
};

export default Profile;
