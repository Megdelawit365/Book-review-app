import React from 'react'
import '../Styles/Signup.css'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const apiURL = import.meta.env.VITE_API_URL

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiURL}/signup`, { email: email, firstName: firstName, lastName: lastName, password: password }, { withCredentials: true })
            .then((res) => {
                console.log(res.data.message);
                Navigate("/explore")
                toast.success(`Welcome ${firstName}!`);

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
                    <h1>Signup</h1>
                    <p>Enter your information to create an account</p>
                    <div className='names-container'>
                        <div>
                            <label htmlFor="" >First Name</label>
                            <input id='fname' onChange={(e) => setFirstName(e.target.value)} placeholder='Kebebush' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Last Name</label>
                            <input id='lname' onChange={(e) => setLastName(e.target.value)} placeholder='Bekele' type="text" />
                        </div>
                    </div>
                    <div className='email-container'>
                        <label htmlFor="">Email</label>
                        <input id='email' onChange={(e) => setEmail(e.target.value)} placeholder='kebebush.bekele@example.com' type="email" name="email" />
                    </div>
                    <div className='email-container'>
                        <label htmlFor="">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter a strong password' type="password" name="password" id="password" />
                    </div>
                    <button type='submit'>Create an account</button>
                    <p>Already have an account? <Link to='/login'>Sign in</Link></p>
                </form>
            </main>
        </>
    )
}

export default SignupPage
