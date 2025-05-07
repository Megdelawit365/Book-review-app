import React from 'react'
import { LiaSwatchbookSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';


const NavBar1 = () => {
  return (
    <nav className='flex-row'>
      <Link to='/' className='flex-row big-font'>
        <LiaSwatchbookSolid />
        <p>BOOKLIFY</p>
      </Link>
    </nav>
  )
}

export default NavBar1
