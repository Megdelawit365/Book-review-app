// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import axios from 'axios';
// import NavBar1 from '../../Components/NavBar1';
// import Footer from '../../Components/Footer';
// import { ToastContainer, toast } from 'react-toastify';

// import { FaBookBookmark } from "react-icons/fa6";


// const SignupPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [user, setUser] = useState({});
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3000/signup', { username, password, email }, { withCredentials: true })
//             .then(res => {
//                 setUser(res.data.user);
//                 toast(`Signed up as: ${res.data.user.username}`);
//                 setTimeout(() => {
//                     navigate(`/explore-books`);
//                 }, 1000);
//             })
//             .catch(error => {
//                 if (error.response && error.response.status === 409) {
//                     toast("User already exists");
//                 } else {
//                     toast('Error signing up');
//                 }
//             });
//     };
//     return (
//         <>
//             <div className='login-page' >
//                 <div className='signup-box'>
//                     <Link to='/' className='flex-row big-font'>
//                                                       <FaBookBookmark />
                                              
//                                               <p>BOOKLIFY</p>
//                                           </Link>
//                 <h2 style={{color:"#0000cd"}} >Signup</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="">Username</label>

//                     <div >
//                         <input onChange={(e) => setUsername(e.target.value)} type="text" name="" id="" placeholder='username' />
//                     </div>
//                     <label htmlFor="">Email</label>

//                     <div>
//                         <input onChange={(e) => setEmail(e.target.value)} type="text" name="" id="" placeholder='email' />
//                     </div>
//                     <label htmlFor="">Password</label>

//                     <div>
//                         <input onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" placeholder='password' />
//                     </div>

//                     <button className='button2' type='submit'>Signup</button>
//                 </form>
//                 <p>Have an Account? <Link to="/login" style={{color:"#0000cd"}}>Login</Link></p>
//                 </div>
                
//             </div>
//         </>
//     )
// }

// export default SignupPage
