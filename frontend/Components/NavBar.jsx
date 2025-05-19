import React, { useEffect, useState } from 'react'
import { LiaSwatchbookSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiNewspaperBold } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { MdLibraryBooks } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";






const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const Navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3000/loggedInUser', { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    setUser(res.data.user)
                } else {
                    setUser(null)
                }
                console.log(user)
            }).catch((err) => {
                console.log(err.message)
                setUser(null)
                console.log(user)
            });
    }, [])



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
        <nav className='flex-row'>
            <Link to='/' className='flex-row big-font'>
                        <FaBookBookmark />
                
                <p>BOOKLIFY</p>
            </Link>

            <RxHamburgerMenu onClick={() => setMenuOpen(!menuOpen)} style={{ marginLeft: "auto" }} className='menu' />

            <div className={`menu-bar ${menuOpen ? 'open' : ''}`}>
                <IoCloseOutline className='close-icon' onClick={() => setMenuOpen(!menuOpen)} />

               

                {user ? <>
                 <div className='flex-row'>
                    <FaUserCircle style={{marginLeft:"0", width:"50%"}} className='icons'/>
                    <div className='flex-column align-left'>
                        <div style={{textAlign:"left", marginRight:"auto" }}>{user ? user.username : ''}</div>
                        <div style={{ color: "#a7a7a7", fontStyle: "italic" }}>{user ? user.email : ''}</div>

                    </div>
                </div>
                    </> : ""}

                 <form style={{ positon: "relative" }} className='search-form-2' onSubmit={handleSubmit} action="">
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className='mini-search-bar' placeholder='Search Books By Title' />
                    <button type='submit' className='search-btn-2'><FaSearch /></button>
                </form >
                

                <Link to='/explore-books'><GoHome className='small-icons' /> Home</Link>
                {user ? (
                    <>

                        <Link to={`/user/saved-books/${user._id}`}><MdFavoriteBorder className='small-icons' /> Saved Books</Link>
                        <Link to={`/user/reviews/${user._id}`}><PiNewspaperBold className='small-icons' /> My Reviews</Link>
                        <Link to={`/add-book`}><IoIosAddCircleOutline className='small-icons' /> Add Book</Link>

                    </>

                ) : (<Link to='/login'><FiLogIn className='icons' /> Login</Link>

                )
                }

            </div>
            <form style={{ positon: "relative" }} className='search-form' onSubmit={handleSubmit} action="">
                <input onChange={(e) => setTitle(e.target.value)} className='search-bar hide' type="text" name="" id="" placeholder='Search Books By Title' />
                <button type='submit' className='search-btn hide'><FaSearch /></button>
            </form >
            <Link className='align-right hide' to='/explore-books'>Explore Books</Link>
            {user ? (
                <FaUserCircle className='icons hide' onClick={() => setProfileOpen(!profileOpen)} />

            ) : (
                <Link to='/login'><button className='hide button2'>Login</button></Link>

            )}

            <div className={`${profileOpen ? 'profile-bar ' : 'close'}`}>
                <div className='flex-row'>
                    <FaUserCircle  style={{fontSize:"2.5rem", marginRight:"1rem"}}/>
                    <div className='flex-column align-left'>
                        <div style={{textAlign:"left", marginRight:"auto" }}>{user ? user.username : ''}</div>
                        <div style={{ color: "#a7a7a7", fontStyle: "italic" }}>{user ? user.email : ''}</div>
                    </div>
                </div>
                

                <hr style={{ border: "1px solid #a7a7a7", width: "100%" }} />
                {user && <>
                    <Link to={`/user/saved-books/${user._id}`} className='hoverDark align-center'> <FaRegBookmark className='small-icons' />Saved Books</Link>
                    <Link to={`/user/reviews/${user._id}`} className='hoverDark'><PiNewspaperBold className='small-icons' />My Reviews</Link>
                <Link to='/add-book' className='hoverDark'><IoIosAddCircleOutline className='small-icons' />Add Books</Link>

                </>}

            </div>


        </nav>
    )
}

export default NavBar
