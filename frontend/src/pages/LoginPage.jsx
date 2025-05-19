import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';
import NavBar1 from '../../Components/NavBar1';
import Footer from '../../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { FaBookBookmark } from "react-icons/fa6";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true })
      .then(res => {
        toast.success(`Logged in as: ${res.data.user.username}`);
        setTimeout(() => {
          navigate(`/explore-books`);
        }, 1000);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          toast("User does not exist");
        } else if (error.response && error.response.status === 401) {
          toast("Incorrect password");
        } else {
          console.log(error.message)
        }
      });
  };
  return (
    <>

      <div className='login-page'>
        <div className='signup-box'>
          <Link to='/' className='flex-row big-font'>
                                  <FaBookBookmark />
                          
                          <p>BOOKLIFY</p>
                      </Link>
        <h2 style={{color:"#0000cd"}}>Login</h2>
        <form onSubmit={handleSubmit}>

          <label htmlFor="">Email</label>

          <div>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="" id="email" placeholder='email' />
          </div>
          <label htmlFor="">Password</label>

          <div>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="password" placeholder='password' />
          </div>

          <button className='button2' type='submit'>Login</button>
        </form>
        <p>Dont have an Account? <Link to="/signup" style={{color:"#0000cd"}}>Signup</Link></p>
        </div>
        
      </div>
    </>

  )
}

export default LoginPage
