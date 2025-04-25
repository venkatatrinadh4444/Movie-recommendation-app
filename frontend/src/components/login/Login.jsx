import loginImg from '../../assets/login.svg'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigateToHome=useNavigate(null)
  const [isReg, setIsReg] = useState(false);
  const [userDetails,setUserDetails]=useState({
    username:'',
    email:'',
    password:'',
  })

  const changeHandler=(e)=> {
    const {name,value}=e.target;
    setUserDetails({...userDetails,[name]:value})
  }

  const registerUser=()=> {
    axios.post('https://yournextmovie.onrender.com/auth/register-user',userDetails).then(res=>toast.success(res.data.msg)).catch(err=>toast.error(err))
    setUserDetails({
      username:'',
    email:'',
    password:'',
    })
  }
  const loginUser=()=> {
    const {email,password}=userDetails
    axios.post('https://yournextmovie.onrender.com/auth/login-user',{email,password}).then(res=>{
      localStorage.setItem('token',res.data.token)
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err))
    setUserDetails({
      username:'',
    email:'',
    password:'',
    })
    setTimeout(()=> {
      navigateToHome('/home')
    },2000)
  }

   const {username,email,password}=userDetails
  return (
    <div className="formContainer d-flex justify-content-center flex-column align-items-center">
        <div>
            <img src={loginImg} alt="logo" width="100%"/>
        </div>
      <Form
        onSubmit={(e) => e.preventDefault()}
        className="col-10 col-lg-4 col-md-6 col-sm-8 formContainerBox p-4 rounded-2 shadow mt-4 mb-4"
      >
        {isReg && (
          <FloatingLabel
            controlId="floatingUsername"
            label="Enter username"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" name="username" value={username} onChange={changeHandler}/>
          </FloatingLabel>
        )}
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" name="email" value={email} onChange={changeHandler}/>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeHandler}/>
        </FloatingLabel>
        <div className="text-center">
          {isReg?<button type="submit" className="btn btn-success" onClick={registerUser}>
            Register
          </button>:<button type="submit" className="btn btn-success" onClick={loginUser}>
            Login
          </button>}
          <p className="text-light">
            {isReg?" Already have account ?":"Register a new account ?"}
            <span onClick={() => setIsReg(!isReg)}style={{"cursor":"pointer"}}> Click Here</span>
          </p>
        </div>
      </Form>
    </div>
  );
};
export default Login;
