import React, { useState } from 'react'
import NavBar1 from '../../Components/NavBar1'
import Footer from '../../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';



const LandingPage = () => {
      const [title, setTitle] = useState("")
          const Navigate = useNavigate();

  
  const handleSubmit = (e) => {

        e.preventDefault()
        axios.get(`http://localhost:3000/api/books/title/${title}`)
            .then((res) => {
                console.log(title)
                if (res.data == 404) {
                    toast('Book not found')
                } else {
                    const id = res.data._id;
                    console.log(res.data)
                    setTitle('')
                    Navigate(`/books/${id}`)
                }

            })
            .catch((err) => {
                if (err.status == 404) {
                    toast('book not found')
                    setTitle('')
                }
                console.log(err.message)
            });
          }
  return (
    <>
    <NavBar1/>
    <main className='landing-page'>
      <Link to='/explore-books' style={{fontSize:"1.2rem", marginTop:"1rem", color:"#000f89"}}  className='show'>Explore books</Link>

      <Link to='/login' className='show'><button >Login</button></Link>
      <Link to='/signup' className='show'><button className='button2' >Signup</button></Link>

      <div className='align-left hero' >
        <h2>Welcome to <span style={{color:"#000f89", fontWeight:"500"}}>Booklify</span></h2>
        <h1 >Discover Books, Read and Write Reviews, Save Favorites and more</h1>
        <form onSubmit={handleSubmit} action="">
          <input onChange={(e) => setTitle(e.target.value)} type="text" name="" id="" placeholder='Search Books' />
          <button type='submit' className='search-btn-3'><FaSearch  style={{color:'white', fontSize:"1.2rem"}} /></button>
          
        </form>
      </div>
      <div >
          <img  src="https://img.freepik.com/free-vector/hand-drawn-glossary-illustration_23-2150287904.jpg?ga=GA1.1.1140237115.1747585731&semt=ais_hybrid&w=740" alt="" />
      </div>
      
        
    </main>
    <Footer/>
    </>
  )
}

export default LandingPage
