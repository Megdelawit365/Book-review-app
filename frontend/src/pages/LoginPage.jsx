// import React from 'react'
import '../Styles/Signup.css'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const apiURL = import.meta.env.VITE_API_URL



const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);

        axios.post(`${apiURL}/login`, { email: email, password: password }, {
            withCredentials: true
        })
            .then((res) => {
                setLoading(false);

                console.log(res.data.message);
                Navigate("/explore")
                toast.success(`Welcome Back ${res.data.user.firstName}!`);

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <NavBar />
            <main className='signup-main'>
                <form onSubmit={handleSubmit} className='signup-container'>
                    <h1>Login</h1>
                    <p>Enter your information to login</p>
                    <div className='email-container'>
                        <label htmlFor="">Email</label>
                        <input id='email' onChange={(e) => setEmail(e.target.value)} placeholder='kebebush.bekele@example.com' type="email" name="email" />
                    </div>
                    <div className='email-container'>
                        <label htmlFor="">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter a strong password' type="password" name="password" id="password" />
                    </div>
                    <button type='submit'>Login
                        {loading &&
                            <div className='spinner-small' />
                        }
                    </button>
                    <p>Don't have an account? <Link to='/signup' >Signup</Link></p>
                </form>
            </main>
        </>
    )
}

export default LoginPage
