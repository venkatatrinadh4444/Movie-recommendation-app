import { useEffect, useState } from "react";
import star from "../../assets/star.jpg";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import "./Home.css";
import axios from "axios";
import {toast} from 'react-toastify'
import moment from 'moment';
import Navbar from '../../components/navabar/Navbar';


const Home = () => {
  const [showComments, setShowComments] = useState({ id: "" });
  const [pageNum, setPageNum] = useState(1);
  const [moviesDeatails, setMoviesDetails] = useState({
    totalMovies: "",
    totalPages: "",
  });
  const [movies, setMovies] = useState([]);
  const [comments,setComments]=useState([])
  const [newComment,setNewComment]=useState('')

  const fetchingMovies = (pageValue) => {
    axios
      .get(
        `https://yournextmovie.onrender.com/movies/all-movies?page=${pageValue}&limit=5`
      )
      .then((res) => {
        setMovies(res.data.movies);
        setMoviesDetails({
          totalMovies: res.data.totalMovies,
          totalPages: res.data.totalPages,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchingMovies(pageNum);
  }, [pageNum]);

  const fetchingComments = (idValue) => {
    setShowComments({ id: idValue})
    axios
      .get(
        `https://yournextmovie.onrender.com/movies/fetching-comments/${idValue}`
      )
      .then((res) =>setComments(res.data.comments))
      .catch((err) => console.log(err));
  };

  const addLike=(idValue)=> {
    const token=localStorage.getItem('token')
    axios.post(`https://yournextmovie.onrender.com/movies/add-like/${idValue}`,{},{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
        toast.success(res.data.msg+" refresh the page to see it")
    }).catch(err=>console.log(err))
  }

  const addComment=(e,idValue)=> {
    const token=localStorage.getItem('token')
    e.preventDefault()
    axios.post(`https://yournextmovie.onrender.com/movies/add-comment/${idValue}`,{text:newComment},{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
        setComments(res.data.updatedComments)
        toast.success(res.data.msg)
    }).catch(err=>console.log(err))
    setNewComment('')
  }

  return (
    <>
    <Navbar/>
    <div>
      <h4 className="text-center">Movie Recommendations</h4>
      <p className="text-center">Discover great movies from the community</p>
      <div className="d-flex flex-wrap justify-content-center">
        {movies.length > 0 ? (
          movies.map((eachMovie) => {
            return (
              <div
                className="m-3 rounded-2 movieCard shadow p-2 m-auto m-sm-3"
                key={eachMovie._id}
              >
                <div className="d-flex gap-1 align-items-center mb-1">
                  <img
                    src={eachMovie.user.profileImg}
                    alt="profile"
                    width="30px"
                  />
                  <h5>{eachMovie.user.username}</h5>
                </div>
                <img
                  src={eachMovie.image}
                  alt="movie"
                  width="100%"
                  className="rounded-2 movieImage"
                />
                <h5 className="mt-1 m-0">{eachMovie.title}</h5>
                <div>
                  {[...Array(eachMovie.rating)].map((_, index) => (
                    <img key={index} src={star} alt="star" width="26px" />
                  ))}
                </div>
                <p className="m-0">{eachMovie.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn d-flex align-content-center" onClick={()=>addLike(eachMovie._id)}>
                    <img src={like} alt="like" width="28px" />
                    <h6 className="pt-3 fw-bold">{eachMovie.likes.length}</h6>
                  </button>
                  {!showComments.id ? (
                    <button
                      className="btn"
                      onClick={() => fetchingComments(eachMovie._id)}
                    >
                      <img src={comment} alt="comment" width="26px" />
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => setShowComments({ id: "" })}
                    >
                      <img src={comment} alt="comment" width="26px" />
                    </button>
                  )}
                </div>
                <div>
                  {eachMovie._id === showComments.id && (
                    <>
                     {comments.length>0? 
                     comments?.map(eachComment=>{
                        return <div className="comments mb-2" key={eachComment._id}>
                        <h6>{eachComment.user.username}</h6>
                        <p>{eachComment.text}</p>
                        <p style={{fontSize:'12px',textAlign:'end',margin:'0px'}}>{moment(eachComment.date).format('DD/MM/YYYY hh:mm a')}</p>
                      </div>
                     }): <div className="comments">
                        <h6>comments here</h6>
                        <p>No comments found</p>
                      </div>}
                      <form className="d-flex mt-2" onSubmit={(e)=>addComment(e,eachMovie._id)}>
                        <input
                          type="text"
                          placeholder="Enter a comment"
                          className="form-control"
                        value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
                        <input
                          type="submit"
                          value="send"
                          className="btn btn-primary"
                        />
                      </form>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h6>No movies found...</h6>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <button
          className="btn"
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum === 1}
        >
          -
        </button>
        <button className="btn fw-bold">Current Page:{pageNum}</button>
        <button
          className="btn"
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum === moviesDeatails.totalPages}
        >
          +
        </button>
      </div>
      <p className="text-center fw-bold m-0">
        Total No of Pages : {moviesDeatails.totalPages}
      </p>
      <p className="text-center fw-bold">
        Total No of Movies : {moviesDeatails.totalMovies}
      </p>
    </div>
    </>
  );
};

export default Home;
