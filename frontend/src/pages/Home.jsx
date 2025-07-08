import React from 'react'
import NavBar from '../Components/NavBar'
import { FaLinkedin, FaPhone, FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import '../Styles/Home.css'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <NavBar />
            <main>
                <section className='hero-section'>
                    <div className='hero-icons-container'>
                        <FiMail /><FaGithub /><FaTelegramPlane /><FaLinkedin /><FaPhone />
                    </div>
                    <h1>Discover <span>Books</span> . Read & Write Reviews. Save Your Favorites.</h1>
                    <p>A Place For Book Lovers To Explore and Share Book Reviews. Join And Find Your Next Great Read!</p>
                    <button><Link to='/explore'>Get Started</Link></button>
                </section>
            </main>
            <Footer />

        </>
    )
}

export default Home
