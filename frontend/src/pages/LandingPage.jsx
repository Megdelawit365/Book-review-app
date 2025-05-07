import React from 'react'
import NavBar1 from '../../Components/NavBar1'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'

const LandingPage = () => {
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
