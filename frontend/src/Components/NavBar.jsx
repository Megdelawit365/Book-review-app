import React from 'react'
import '../Styles/NavBar.css'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa';
import { FiHome, FiCompass, FiUpload, FiSearch, FiX } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const apiURL = import.meta.env.VITE_API_URL

const NavBar = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)
    const [openSearch, setOpenSearch] = useState(false)

    useEffect(() => {

        axios.get(`${apiURL}/searchGoogleBooks?q=${searchQuery}`)
            .then((res) => {
                console.log(res.data.items)
                setSearchResult(res.data.items)
                setSearchLoading(false)
            })


    }, [searchQuery])
    return (
        <nav>
            <h1>Booklify</h1>
            <div className='links-container small-screen-hide'>
                <NavLink to='/' className={({ isActive }) => isActive ? "active-links" : ""}>Home</NavLink>
                <NavLink to='/explore' className={({ isActive }) => isActive ? "active-links" : ""}>Explore</NavLink>
                <NavLink to='/submit' className={({ isActive }) => isActive ? "active-links" : ""}>Submit</NavLink>
            </div>
            <button className='small-screen-show signup-btn-small'><Link to='/signup'>Sign up</Link></button>

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
                                    <img src={result?.volumeInfo?.imageLinks?.thumbnail?.replace(/^http:/, 'https:') || 'https://placehold.co/200x300?text=No+Cover'} alt="" />
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
                <button><Link to='/signup'>Sign up</Link></button>
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

            </div>
        </nav>
    )
}

export default NavBar
