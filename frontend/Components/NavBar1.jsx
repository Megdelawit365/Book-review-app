import React from 'react'
import { MdLibraryBooks } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBookBookmark } from "react-icons/fa6";


const NavBar1 = () => {
  return (
    <nav className='flex-row nav2'>
      <Link to='/' className='flex-row big-font ' style={{width:"100%"}}>
        <FaBookBookmark />

        <p>BOOKLIFY</p>
        <div className='flex-row align-right hide'>
          <Link to='/explore-books'>Explore Books</Link>
          <Link to='/login'><button >Login</button></Link>
                    <Link to='/signup'><button className='button2' >Signup</button></Link>

          
          
        </div>

      </Link>
    </nav>
  )
}

export default NavBar1
