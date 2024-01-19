import React from 'react'
import { useState } from 'react'
import classes from './login.module.css'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import img from '../../assets/womaneating2.jpg'
import { login } from '../../redux/authSlice'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
      e.preventDefault()

      try {
        const res = await axios.post(`http://localhost:5000/auth/login`, {
          email,
          password,
        });
  
        const data = res.data;
        console.log(data);
        dispatch(login(data)); // Assuming login is an action to update user state
        navigate("/");
  
      } catch (error) {
        console.error(error.response || error); // Axios errors have a 'response' property
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
  }
  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={img} className={classes.leftImg} alt='img'/>
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input type="email" placeholder='Type email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Type password' onChange={(e) => setPassword(e.target.value)}/>
            <button className={classes.submitBtn}>Login</button>
            <p className={classes.signupBtn}>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
          {
            error && <div className={classes.errorMessage}>
          Wrong credentials! Try different ones
            </div>
          }
        </div>
      </div>
    </div>
)
}
export default Login;