import React from 'react'
import '../Styles/NavBar.css'
import { NavLink, Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const apiURL = import.meta.env.VITE_API_URL

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)

    useEffect(() => {

        axios.get(`${apiURL}/api/searchGoogleBooks?q=${searchQuery}`)
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
            <div className='small-screen-hide search-container'>
                <form action="">
                    <input onChange={(e) => { setSearchQuery(e.target.value) }} type="text" placeholder='Search for any book' />
                    <FaSearch className='icon' />
                </form>
                <button><Link>Sign up</Link></button>
                {
                    searchQuery != "" && searchResult ?

                        <div className='search-result'>
                            {searchResult.map((result, index) => {
                                return <div key={index}>
                                    <img src={result?.volumeInfo?.imageLinks?.thumbnail} alt="" />
                                    <p  >{result.volumeInfo.title}</p>
                                </div>
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
