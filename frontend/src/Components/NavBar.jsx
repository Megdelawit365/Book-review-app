import React from 'react'
import '../Styles/NavBar.css'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaRegUserCircle, FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import { FiHome, FiCompass, FiUpload, FiSearch, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { MdAccountCircle } from 'react-icons/md';

const apiURL = import.meta.env.VITE_API_URL

const NavBar = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)
    const [openSearch, setOpenSearch] = useState(false)
    const [user, setUser] = useState("")
    const [showProfile, setShowProfile] = useState(false)
    const Navigate = useNavigate();
    useEffect(() => {

        axios.get(`${apiURL}/searchGoogleBooks?q=${searchQuery}`)
            .then((res) => {
                console.log(res.data.items)
                setSearchResult(res.data.items)
                setSearchLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [searchQuery])

    useEffect(() => {

        axios.get(`${apiURL}/loggedInUser`, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.email)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const handleLogout = () => {
        axios.post(`${apiURL}/logout`, null, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.message)
                const id = toast('Logged out successfully');
                setTimeout(() => toast.dismiss(id), 2000);

                setTimeout(() => {
                    window.location.reload();
                    Navigate('/explore')
                }, 2000);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <nav >
            <h1>Booklify</h1>
            {
                location.pathname != '/signup' && location.pathname != '/login' &&
                <>
                    <div className='links-container small-screen-hide'>
                        <NavLink to='/' className={({ isActive }) => isActive ? "active-links" : ""}>Home</NavLink>
                        <NavLink to='/explore' className={({ isActive }) => isActive ? "active-links" : ""}>Explore</NavLink>
                        <NavLink to='/submit' className={({ isActive }) => isActive ? "active-links" : ""}>Submit</NavLink>
                    </div>



                    <div className={`small-screen-search small-screen-show ${openSearch ? "open" : "close"}`}>
                        <div className='search-top'>
                            <form action="">
                                <input onChange={(e) => { setSearchQuery(e.target.value) }} type="text" placeholder='Search for any book' />
                                <FaSearch className='icon' />
                            </form>
                            <FiX className='close-icon' onClick={() => setOpenSearch(false)} />
                        </div>

                        {
                            searchQuery != "" && searchResult ?

                                <div className='search-result'>
                                    {searchResult.map((result, index) => {
                                        return <Link className='result-container' key={index} to={`/details/${result?.volumeInfo?.industryIdentifiers?.[1]?.identifier}`} state={{ isbn: result?.volumeInfo?.industryIdentifiers?.[1]?.identifier }}>
                                            <img src={result?.volumeInfo?.imageLinks?.thumbnail || 'https://placehold.co/200x300?text=No+Cover'} alt="" />
                                            <p  >{result.volumeInfo.title}</p>
                                        </Link>
                                    })}
                                    <Link>See All Results</Link>
                                </div>
                                : searchQuery != "" && !searchResult ?
                                    <div className='search-result'>
                                        <Link>No results found :(</Link>
                                    </div>
                                    : <></>
                        }
                    </div>




                    {
                        location.pathname != '/' &&
                        <div className='sliding-nav small-screen-show'>
                            <div>
                                <FiHome className='icon' />
                                <NavLink to='/' className={({ isActive }) => isActive ? "active-sliding-links" : ""}>Home</NavLink>
                            </div>
                            <div>
                                <FiCompass className='icon' />
                                <NavLink to='/explore' className={({ isActive }) => isActive ? "active-sliding-links" : ""}>Explore</NavLink>

                            </div>
                            <div>
                                <FiUpload className='icon' />
                                <NavLink to='/submit' className={({ isActive }) => isActive ? "active-sliding-links" : ""}>Submit</NavLink>

                            </div>
                            <div onClick={() => setOpenSearch(true)}>
                                <FiSearch className='icon' />
                                <NavLink>Search</NavLink>

                            </div>

                        </div>
                    }

                    <div className='small-screen-hide search-container'>
                        <form action="">
                            <input onChange={(e) => { setSearchQuery(e.target.value) }} type="text" placeholder='Search for any book' />
                            <FaSearch className='icon' />
                        </form>
                        {
                            searchQuery != "" && searchResult ?

                                <div className='search-result'>
                                    {searchResult.map((result, index) => {
                                        return <Link className='result-container' key={index} to={`/details/${result?.volumeInfo?.industryIdentifiers?.[1]?.identifier}`} state={{ isbn: result?.volumeInfo?.industryIdentifiers?.[1]?.identifier }}>
                                            <img src={result?.volumeInfo?.imageLinks?.thumbnail} alt="" />
                                            <p  >{result.volumeInfo.title}</p>
                                        </Link>
                                    })}
                                    <Link>See All Results</Link>
                                </div>
                                : searchQuery != "" && !searchResult ?
                                    <div className='search-result'>
                                        <Link>No results found :(</Link>
                                    </div>
                                    : <></>
                        }
                        {user ?
                            <div onClick={() => setShowProfile(!showProfile)} className='profile-icon all-screen-show'>
                                {user.firstName?.[0].toUpperCase()}
                            </div> :
                            <button><Link to='/signup'>Sign up</Link></button>
                        }
                    </div>
                    {user ?
                        <div onClick={() => setShowProfile(!showProfile)} className='profile-icon small-screen-show'>
                            {user.firstName?.[0].toUpperCase()}
                        </div> :
                        <button className='small-screen-show' ><Link to='/signup'>Sign up</Link></button>
                    }
                    {
                        showProfile &&
                        <div className='drop-down'>
                            <div>
                                <FaRegUserCircle size={17} />
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <AiOutlineStar size={20} />
                                <p>Saved Books</p>

                            </div>
                            <div onClick={handleLogout}>
                                <FiLogOut size={17} />
                                <p>Logout</p>
                            </div>


                        </div>
                    }
                </>}
        </nav>
    )
}

export default NavBar
