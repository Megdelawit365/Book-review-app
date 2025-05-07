import React from 'react'
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer>
      <a href="mailto:megdelawitaynalem365@gmail.com" target="_blank"><SiGmail className='footer-icons' />
      </a>
      <a href="https://github.com/megdelawitxxx" target="_blank" 
      ><FaGithub className='footer-icons' />
      </a>


    </footer>
  )
}

export default Footer
