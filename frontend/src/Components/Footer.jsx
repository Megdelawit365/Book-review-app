import React from 'react'
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className='flex-row  space-between'>
      <p>&copy; 2025 Booklify</p>
      <div >
        <a href="mailto:megdelawitaynalem365@gmail.com" target="_blank"><SiGmail className='footer-icons' /></a>
      <a href="https://github.com/megdelawit365" target="_blank" ><FaGithub className='footer-icons' /></a>
      </div>
      


    </footer>
  )
}

export default Footer
