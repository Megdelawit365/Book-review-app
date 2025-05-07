import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';
import NavBar1 from '../../Components/NavBar1';
import Footer from '../../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';



const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/signup', { username, password, email }, { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                toast(`Signed up as: ${res.data.user.username}`);
                setTimeout(() => {
                    navigate(`/explore-books`);
                }, 1000);
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    toast("User already exists");
                } else {
                    toast('Error signing up');
                }
            });
    };
    return (
        <>
        <NavBar1/>
            <main >
                <div className='signup-box'>
                <h2 style={{color:"#0000cd"}} >Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>

                    <div >
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="" id="" placeholder='username' />
                    </div>
                    <label htmlFor="">Email</label>

                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder='email' />
                    </div>
                    <label htmlFor="">Password</label>

                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder='password' />
                    </div>

                    <button type='submit'>Signup</button>
                </form>
                <p>Have an Account? <Link to="/login" style={{color:"#0000cd"}}>Login</Link></p>
                </div>
                
            </main>
            <Footer/>
        </>
    )
}

export default SignupPage
