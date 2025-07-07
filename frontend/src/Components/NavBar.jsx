import React from 'react'
import '../Styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
const NavBar = () => {
    return (
        <nav>
            <h1>Booklify</h1>
            <div className='links-container'>
                <NavLink to='/' className={({ isActive }) => isActive ? "active-links" : ""}>Home</NavLink>
                <NavLink to='/explore' className={({ isActive }) => isActive ? "active-links" : ""}>Explore</NavLink>
                <NavLink to='/submit' className={({ isActive }) => isActive ? "active-links" : ""}>Submit</NavLink>
            </div>
            <div>
                <form action="">
                    <input type="text" placeholder='Search for any book' />
                    <FaSearch className='icon' />
                </form>
                <button><Link>Sign up</Link></button>
            </div>

        </nav>
    )
}

export default NavBar
