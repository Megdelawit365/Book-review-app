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
        <h1>Welcome to <span style={{color:"#0000cd"}}>Booklify</span></h1>
        <h3>Discover Books, Read and Write Reviews, Save Favorites and more</h3>
        <Link to='/Signup'><button>Signup</button></Link>
        <Link to='/explore-books'><button>Explore Books</button></Link>
    </main>
    <Footer/>
    </>
  )
}

export default LandingPage
